import { decQuota, getOrCreateUserByEmail } from '../../lib/db';

export default async function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { attack, email } = req.body || {};
  if(!email || !email.includes('@')){
    return res.status(401).json({ error: '请先在 /pricing 用邮箱开通（MVP方案），或在此请求体里带上 email' });
  }
  await getOrCreateUserByEmail(email);

  const quota = await decQuota(email);
  if(!quota.ok){
    if(quota.reason === 'exhausted'){
      return res.status(402).json({ error: '今日次数已用完，前往 /pricing 升级以增加配额' });
    }
    return res.status(500).json({ error: '配额服务暂时不可用' });
  }

  const label = (attack && String(attack).trim()) || '敏感';
  const text1 = `你说我${label}，可这份${label}装着我一路走来的坚持与收获，守住的底线，以及不再为错的人妥协的心。它保护我，也容下了我的整个世界，只是——没有你的位置。`;
  const text2 = `如果${label}意味着坚持自我和尊严，那我愿意一直${label}下去。`;

  return res.status(200).json({ items: [text1, text2], left: quota.left, plan: quota.plan });
}
