import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home(){
  // 主题
  const [isDark, setIsDark] = useState(false);
  const [showTOC, setShowTOC] = useState(false);

  useEffect(() => {
    const prefersDark = typeof window !== 'undefined'
      && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const dark = saved ? saved === 'dark' : prefersDark;
    setIsDark(dark);
    document.body.classList.toggle('dark', dark);
  }, []);
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // 复制
  const copy = async (txt) => {
    try { await navigator.clipboard.writeText((txt || '').trim()); showToast('已复制到剪贴板'); }
    catch {}
  };
  const showToast = (msg) => {
    const t = document.getElementById('toast'); if(!t) return;
    t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 1800);
  };

  // 10 条卡片
  const quickList = [
    {title:'“你太敏感了”', tone:['冷静型','坚定型'], body:`你说我太敏感，
可这份敏感装着我一路走来累积的共情与细腻，
守住的底线，
以及对值得之人的真诚。
它保护我，也容下了我的整个世界，
只是——没有你的位置。
它随着经历而成熟，
却从来不是你以为的玻璃心。`, short:'省流版：请自便。'},
    {title:'“你太固执了”', tone:['坚定型'], body:`你说我太固执，
可这份固执装着我一路走来坚持的信念，
守住的原则，以及不违心的真诚……
它保护我，也容下了我的整个世界，只是——没有你的位置。
它随着时间变得坚定，却从来不是你以为的死板。`, short:'省流版：到此为止。'},
    {title:'“你要求太多”', tone:['冷静型','锋利型'], body:`你说我要求太多，
可这些要求装着我一路守住的尊严与边界，
以及真心换真心的信念……
它保护我，也容下我的世界，只是——没有你的位置。
它随着认知提升而升级，却不是你以为的挑剔。`, short:'省流版：各取所需，别联系。'},
    {title:'“你太强势了”', tone:['坚定型'], body:`你说我太强势，
可这份强势装着我学会的独立与自由，
以及敢于担当的勇气……
它保护我，也容下我的世界，只是——没有你的位置。
它经风雨更坚韧，而非你以为的咄咄逼人。`, short:'省流版：不用配合你。'},
    {title:'“你变了”', tone:['冷静型'], body:`你说我变了，
这份变化装着我的成长与觉醒，
守住的底线，以及不再为错的人妥协的心……
它保护我，也容下我的世界，只是——没有你的位置。
它随时光绽放，而非你以为的背叛。`, short:'省流版：向前走。'},
    {title:'“你太冷漠了”', tone:['疏离型'], body:`你说我太冷漠，
这份克制装着我收起的天真与自我保护，
让温暖不再被消耗……
它保护我，也容下我的世界，只是——没有你的位置。
它经教训而克制，而非你以为的无情。`, short:'省流版：不必熟络。'},
    {title:'“你太自私了”', tone:['坚定型'], body:`你说我太自私，
这份自爱装着我守住的健康与精力，
不再被榨干……
它保护我，也容下我的世界，只是——没有你的位置。
它随界限感生长，而非你以为的冷血。`, short:'省流版：我的人生我做主。'},
    {title:'“你太情绪化了”', tone:['冷静型'], body:`你说我太情绪化，
这份情感装着我对生活的热度与真诚，
为值得的人全情投入……
它保护我，也容下我的世界，只是——没有你的位置。
它使感知力丰盈，而非你以为的难相处。`, short:'省流版：不必评判我。'},
    {title:'“你太骄傲了”', tone:['坚定型','锋利型'], body:`你说我太骄傲，
这份自尊装着我走来的自信与荣耀，
不随意低头……
它保护我，也容下我的世界，只是——没有你的位置。
它让价值稳固，而非你以为的傲慢。`, short:'省流版：不为你降级。'},
    {title:'“你的需求像一个盒子”', tone:['锋利型','冷静型'], body:`你说我的需求像一个盒子，四四方方。
可我的盒子，装着我跌跌撞撞的日子里建立的原则，
守住的边界，
有温度的小心翼翼的关心，
看破看淡看不见的宽容，
还有买单离场的勇气。
它保护我，它把我的世界都容下了——却容不下你。
它随四季涨落，谁说它是四四方方的？`, short:'省流版：滚吧。'}
  ];
  const toneClass = (t) => t.includes('锋利') ? 'sharp' : t.includes('坚定') ? 'strong' : t.includes('冷静') ? 'calm' : t.includes('疏离') ? 'cold' : '';

  // 生成器（MVP版）
  const [atk,setAtk]=useState(''),[pos,setPos]=useState(''),[det,setDet]=useState(''),[prog,setProg]=useState(''),[neg,setNeg]=useState(''),[end,setEnd]=useState('滚吧'),[out,setOut]=useState('');
  const gen = ()=>{
    const a=atk||'敏感', p=pos||'共情与细腻',
      d=det||'跌跌撞撞的日子里建立的原则、守住的边界、买单离场的勇气',
      pr=prog||'随着经历而成熟', n=neg||'玻璃心', e=end||'到此为止';
    setOut(`你说我${a}，
可这份${a}装着我一路走来${p}，
以及${d}。
它保护我，也容下了我的整个世界，
只是——没有你的位置。
它${pr}，却从来不是你以为的${n}。
省流版：${e}。`);
    showToast('已生成');
  };

  return (
    <>
      <Head>
        <title>高杀伤优雅反击 · 关系教练</title>
        <meta name="description" content="面对挑衅或贬低？1 分钟生成优雅高情商反击。含 10 条速查、万能生成器、时间轴与参考资料。" />
      </Head>

      {/* 顶部 */}
      <header aria-label="页眉">
        <div className="header-inner">
          <div className="brand">高杀伤<b>·</b>优雅反击</div>
          <nav aria-label="主导航">
            <a href="#hero">首页</a>
            <a href="#quick10">速查</a>
            <a href="#generator">生成器</a>
            <a href="/pricing">开通会员</a>
          </nav>
          <button className="btn" onClick={toggleTheme} aria-label="切换夜间模式">🌓 夜间</button>
        </div>
      </header>

      <main className="container">
        {/* 目录（移动端可折叠） */}
        <aside className={`toc ${showTOC ? 'show' : ''}`} id="toc" aria-label="目录" aria-hidden={showTOC ? 'false' : 'true'}>
          <button className="btn close" onClick={()=>setShowTOC(false)}>关闭目录</button>
          <h4>目录</h4>
          <a href="#hero" onClick={()=>setShowTOC(false)}>首页导语</a>
          <a href="#quick10" onClick={()=>setShowTOC(false)}>速查：10 条反击</a>
          <a href="#generator" onClick={()=>setShowTOC(false)}>万能回击生成器</a>
        </aside>
        <div id="tocFab"><button className="btn" onClick={()=>setShowTOC(true)}>📑 目录</button></div>

        {/* Hero */}
        <section id="hero" className="section" aria-labelledby="hero-h">
          <span className="kicker">欢迎</span>
          <h2 id="hero-h">面对挑衅或贬低？1 分钟生成优雅高情商反击</h2>
          <p className="small muted">少解释，多边界，立即可用。</p>
          <div className="grid cols-2">
            <div className="card">
              <h3>开始使用</h3>
              <p>输入对方的话，选择语气与细节，一键生成你的优雅回应。</p>
              <div className="toolbar">
                <a className="btn" href="#generator">开始生成 →</a>
                <a className="btn" href="#quick10">查看 10 条速查 →</a>
              </div>
            </div>
            <div className="card example">
              <h3>示例</h3>
              <div className="quote" style={{whiteSpace:'pre-wrap'}}>
{`对方：你太敏感了
你：你说我太敏感，可这份敏感装着我一路走来累积的共情与细腻，守住的底线，以及对值得之人的真诚。它保护我，也容下了我的整个世界，只是——没有你的位置。它随着经历而成熟，却从来不是你以为的玻璃心。`}
              </div>
              <p className="small">（已做自动换行与溢出处理）</p>
            </div>
          </div>
        </section>

        {/* 10 条速查 */}
        <section id="quick10" className="section" aria-labelledby="q10-h">
          <span className="kicker">速查</span>
          <h2 id="q10-h">高杀伤优雅反击 · 10 条</h2>
          <div className="grid cols-2">
            {quickList.map((item, idx)=>(
              <div className="card" key={idx}>
                <h3>{item.title}</h3>
                <div className="badges">
                  {item.tone.map((t,i)=><span key={i} className={`badge ${toneClass(t)}`}>{t}</span>)}
                </div>
                <div className="quote" style={{whiteSpace:'pre-wrap'}}>{item.body}</div>
                <p className="small">{item.short}</p>
                <div className="toolbar">
                  <button className="btn" onClick={()=>copy(item.body)}>复制</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 生成器 */}
        <section id="generator" className="section" aria-labelledby="gen-h">
          <span className="kicker">工具</span>
          <h2 id="gen-h">万能回击生成器</h2>
          <fieldset>
            <legend>填空即可生成文本</legend>
            <div className="row">
              <div>
                <label>攻击词</label>
                <input className="input" value={atk} onChange={e=>setAtk(e.target.value)} placeholder="如：敏感 / 固执 / 难搞" />
              </div>
              <div>
                <label>积极诠释</label>
                <input className="input" value={pos} onChange={e=>setPos(e.target.value)} placeholder="如：共情 / 信念 / 原则 / 自爱" />
              </div>
            </div>
            <div className="row" style={{marginTop:10}}>
              <div>
                <label>专属细节</label>
                <input className="input" value={det} onChange={e=>setDet(e.target.value)} placeholder="如：原则、边界、买单离场的勇气" />
              </div>
              <div>
                <label>经历与变化</label>
                <input className="input" value={prog} onChange={e=>setProg(e.target.value)} placeholder="如：随着经历而成熟 / 随风雨而坚韧" />
              </div>
            </div>
            <div className="row" style={{marginTop:10}}>
              <div>
                <label>对方的贬义词</label>
                <input className="input" value={neg} onChange={e=>setNeg(e.target.value)} placeholder="如：玻璃心 / 死板 / 麻烦" />
              </div>
              <div>
                <label>省流狠话</label>
                <select className="input" value={end} onChange={e=>setEnd(e.target.value)}>
                  <option>滚吧</option>
                  <option>请自便</option>
                  <option>到此为止</option>
                  <option>保重，别联系</option>
                </select>
              </div>
            </div>
            <div className="toolbar" style={{marginTop:10}}>
              <button className="btn" onClick={gen}>一键生成</button>
              <button className="btn" onClick={()=>copy(out)}>复制结果</button>
              <a className="btn" href="/pricing">想要更高额度？去开通 →</a>
            </div>
            <textarea className="input gen-output" value={out} onChange={e=>setOut(e.target.value)} placeholder="生成结果会出现在这里…" aria-label="生成文本输出" />
          </fieldset>
        </section>
      </main>

      <footer>
        <p className="small">© {new Date().getFullYear()} Relationship Coach · MVP</p>
      </footer>

      <div id="toast" className="toast" role="status" aria-live="polite">已复制到剪贴板</div>
    </>
  );
}
