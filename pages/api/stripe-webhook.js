import Stripe from 'stripe';
import { buffer } from 'micro';
import { updatePlanByEmail } from '../../lib/db';

export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res){
  const sig = req.headers['stripe-signature'];
  let event;
  try{
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }catch(e){
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  if(event.type === 'checkout.session.completed'){
    const s = event.data.object;
    const email = s.customer_details?.email || s.customer_email || s.metadata?.email;
    const priceId = s?.display_items?.[0]?.plan?.id || s?.line_items?.data?.[0]?.price?.id;
    let plan = 'starter';
    if(priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) plan = 'pro';
    await updatePlanByEmail(email, plan);
  }

  // 你也可以处理 invoice.paid / customer.subscription.deleted 做降级
  return res.json({received:true});
}
