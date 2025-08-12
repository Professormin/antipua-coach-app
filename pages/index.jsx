import Link from 'next/link';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home(){
  return (
    <>
      <Head>
        <title>关系教练 · PUA 话术生成器</title>
        <meta name="description" content="高杀伤优雅反击 · 防御PUA与否定攻击 · 建立健康边界" />
        <meta property="og:title" content="关系教练 · PUA 话术生成器" />
        <meta property="og:description" content="输入攻击词，秒出优雅反击。含10条速查、生成器与模板。" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="hero">
        <div className="container">
          <h1>关系教练 · 高杀伤优雅反击</h1>
          <p>把你的 GitHub 静态页升级为可用功能站。从模板到生成器，1 分钟出结果。</p>
          <p>
            <Link href="/generator" className="btn">开始生成 →</Link>
          </p>
          <div className="card">
            <h2>为什么有效</h2>
            <p>拒绝定义 → 重新赋义 → 展示价值 → 明确拒绝 → 优雅收尾。</p>
            <span className="badge">冷静型</span>
            <span className="badge">坚定型</span>
            <span className="badge">锋利型</span>
          </div>
          <div className="card">
            <h2>示例</h2>
            <pre className="small">对方：你太敏感了
你：你说我太敏感，可这份敏感装着我一路走来的共情与细腻……只是不包含你。</pre>
          </div>
        </div>
      </div>
      <div className="container footer">
        <p>© {new Date().getFullYear()} Relationship Coach · MVP</p>
      </div>
    </>
  )
}
