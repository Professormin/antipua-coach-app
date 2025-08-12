import { useState } from 'react';

export default function Pricing(){
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function buy(priceId){
    if(!email || !email.includes('@')){ alert('请输入有效邮箱'); return; }
    setLoading(true);
    const r = await fetch('/api/checkout', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ priceId, email })
    });
    const data = await r.json();
    setLoading(false);
    if(data?.url) window.location = data.url;
    else alert(data?.error || '创建订单失败');
  }

  return (
    <div className="container">
      <h1>开通会员</h1>
      <p className="small">用邮箱识别你的账户（MVP 方案，后续可接入登录）。</p>
      <input className="input" placeholder="你的邮箱" value={email} onChange={e=>setEmail(e.target.value)} />
      <div className="card">
        <h3>Starter · 50 次/日</h3>
        <button className="btn" disabled={loading} onClick={()=>buy(process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER)}>¥ / 月 → 购买</button>
      </div>
      <div className="card">
        <h3>Pro · 200 次/日</h3>
        <button className="btn" disabled={loading} onClick={()=>buy(process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO)}>¥ / 月 → 购买</button>
      </div>
    </div>
  );
}
