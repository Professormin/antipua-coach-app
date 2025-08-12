export default function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { attack } = req.body;
  if(!attack || typeof attack !== 'string'){
    return res.status(400).json({ error: '缺少攻击语' });
  }

  const template = (label) => 
    `你说我${label}，可这份${label}装着我一路走来的坚持与收获，守住的底线，以及不再为错的人妥协的心。它保护我，也容下了我的整个世界，只是——没有你的位置。`;

  const items = [
    template(attack),
    `你说我${attack}，那是因为你不了解我一路走来的故事。我的边界和原则，是用无数经历换来的，不会为不值得的人改变。`,
    `如果${attack}意味着坚持自我和尊严，那我愿意一直${attack}下去。`
  ];

  return res.status(200).json({ items });
}
