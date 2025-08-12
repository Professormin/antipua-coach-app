import Stripe from 'stripe';
import { getOrCreateUserByEmail } from '../../lib/db';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const { priceId, email } = req.body || {};
  if(!priceId || !email) return res.status(400).json({error:'缺少参数'});

  // 先在 DB 里确保有这个邮箱的用户
  await getOrCreateUserByEmail(email);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/?paid=1`,
    cancel_url: `${req.headers.origin}/pricing?cancel=1`,
    metadata: { email }
  });
  return res.status(200).json({ url: session.url });
}
