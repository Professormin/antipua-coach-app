import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home(){
  const [isDark,setIsDark]=useState(false),[showTOC,setShowTOC]=useState(false);
  useEffect(()=>{const p=matchMedia('(prefers-color-scheme: dark)').matches;
    const s=localStorage.getItem('theme');const d=s?s==='dark':p;setIsDark(d);
    document.body.classList.toggle('dark',d)},[]);
  const toggleTheme=()=>{const n=!isDark;setIsDark(n);document.body.classList.toggle('dark',n);
    localStorage.setItem('theme',n?'dark':'light')};

  const [atk,setAtk]=useState(''),[pos,setPos]=useState(''),[det,setDet]=useState(''),
        [prog,setProg]=useState(''),[neg,setNeg]=useState(''),[end,setEnd]=useState('滚吧'),
        [out,setOut]=useState('');
  const copy=async t=>{try{await navigator.clipboard.writeText((t||'').trim())}catch{}};

  const gen=()=>{const a=atk||'敏感',p=pos||'共情与细腻',
    d=det||'跌跌撞撞的日子里建立的原则、守住的边界、买单离场的勇气',
    pr=prog||'随着经历而成熟',n=neg||'玻璃心',e=end||'到此为止';
    setOut(`你说我${a}，
可这份${a}装着我一路走来${p}，
以及${d}。
它保护我，也容下了我的整个世界，
只是——没有你的位置。
它${pr}，却从来不是你以为的${n}。
省流版：${e}。`);};

  const toneClass=t=>t.includes('锋利')?'sharp':t.includes('坚定')?'strong':t.includes('冷静')?'calm':t.includes('疏离')?'cold':'';
  const quickList=[{title:'“你太敏感了”',tone:['冷静型','坚定型'],body:`你说我太敏感，
可这份敏感装着我一路走来累积的共情与细腻，
守住的底线，
以及对值得之人的真诚。
它保护我，也容下了我的整个世界，
只是——没有你的位置。
它随着经历而成熟，
却从来不是你以为的玻璃心。`,short:'省流版：请自便。'}];

  return (<>
    <Head><title>高杀伤优雅反击 · 关系教练</title></Head>

    <header aria-label="页眉">
      <div className="header-inner">
        <div className="brand">高杀伤<b>·</b>优雅反击</div>
        <nav><a href="#hero">首页</a><a href="#quick10">速查</a><a href="#generator">生成器</a></nav>
        <button className="btn" onClick={toggleTheme}>🌓 夜间</button>
      </div>
    </header>

    <main className="container">
      <aside className={`toc ${showTOC?'show':''}`}><button className="btn close" onClick={()=>setShowTOC(false)}>关闭目录</button>
        <h4>目录</h4><a href="#hero" onClick={()=>setShowTOC(false)}>首页导语</a>
        <a href="#quick10" onClick={()=>setShowTOC(false)}>速查</a>
        <a href="#generator" onClick={()=>setShowTOC(false)}>生成器</a></aside>
      <div id="tocFab"><button className="btn" onClick={()=>setShowTOC(true)}>📑 目录</button></div>

      <section id="hero" className="section">
        <span className="kicker">欢迎</span>
        <h2>面对挑衅或贬低？1 分钟生成优雅高情商反击</h2>
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
你：你说我太敏感，可这份敏感装着我一路走来累积的共情与细腻……却从来不是你以为的玻璃心。`}
            </div>
            <p className="small">（已做自动换行与溢出处理）</p>
          </div>
        </div>
      </section>

      <section id="quick10" className="section">
        <span className="kicker">速查</span><h2>高杀伤优雅反击 · 10 条</h2>
        <div className="grid cols-2">
          {quickList.map((it,i)=>(
            <div className="card" key={i}>
              <h3>{it.title}</h3>
              <div className="badges">{it.tone.map((t,j)=><span key={j} className={`badge ${toneClass(t)}`}>{t}</span>)}</div>
              <div className="quote" style={{whiteSpace:'pre-wrap'}}>{it.body}</div>
              <p className="small">{it.short}</p>
              <div className="toolbar"><button className="btn" onClick={()=>copy(it.body)}>复制</button></div>
            </div>
          ))}
        </div>
      </section>

      <section id="generator" className="section">
        <span className="kicker">工具</span><h2>万能回击生成器</h2>
        <div className="row">
          <div><label>攻击词</label><input className="input" value={atk} onChange={e=>setAtk(e.target.value)} placeholder="如：敏感 / 固执 / 难搞" /></div>
          <div><label>积极诠释</label><input className="input" value={pos} onChange={e=>setPos(e.target.value)} placeholder="如：共情 / 信念 / 原则 / 自爱" /></div>
        </div>
        <div className="row" style={{marginTop:10}}>
          <div><label>专属细节</label><input className="input" value={det} onChange={e=>setDet(e.target.value)} placeholder="如：原则、边界、勇气" /></div>
          <div><label>经历与变化</label><input className="input" value={prog} onChange={e=>setProg(e.target.value)} placeholder="如：随着经历而成熟" /></div>
        </div>
        <div className="row" style={{marginTop:10}}>
          <div><label>对方的贬义词</label><input className="input" value={neg} onChange={e=>setNeg(e.target.value)} placeholder="如：玻璃心 / 死板" /></div>
          <div><label>省流狠话</label>
            <select className="input" value={end} onChange={e=>setEnd(e.target.value)}>
              <option>滚吧</option><option>请自便</option><option>到此为止</option><option>保重，别联系</option>
            </select>
          </div>
        </div>
        <div className="toolbar" style={{marginTop:10}}>
          <button className="btn" onClick={gen}>一键生成</button>
          <button className="btn" onClick={()=>copy(out)}>复制结果</button>
        </div>
        <textarea className="input gen-output" value={out} onChange={e=>setOut(e.target.value)} placeholder="生成结果会出现在这里…" />
      </section>
    </main>

    <footer><p className="small">© {new Date().getFullYear()} Relationship Coach · MVP</p></footer>
  </>);
}
