import { useState } from 'react';

export default function Generator(){
  const [input, setInput] = useState('你太敏感了');
  const [email, setEmail] = useState('');     // 新增：邮箱
  const [results, setResults] = useState([]);
  const [left, setLeft] = useState(null);     // 新增：剩余额度
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if(!email || !email.includes('@')){ setError('请输入邮箱（MVP 用作账户标识）'); return; }
    setLoading(true); setError('');
    try{
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attack: input, email })
      });
      const data = await res.json();
      if(res.ok){
        setResults(data.items || []);
        setLeft(typeof data.left === 'number' ? data.left : null);
      } else {
        setError(data.error || '生成失败');
      }
    } catch(e){
      setError('网络错误');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>PUA 话术生成器</h1>
      <div className="card">
        <label>邮箱（MVP 用作账户标识，付款、配额都跟这个邮箱绑定）</label>
        <input className="input" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <p>输入攻击词，比如「你太敏感了」→ 秒出优雅反击</p>
      <input className="input" value={input} onChange={e=>setInput(e.target.value)} />
      <p>
        <button className="btn" onClick={handleGenerate} disabled={loading}>
          {loading ? '生成中...' : '生成'}
        </button>
        <a className="btn" href="/pricing" style={{marginLeft:8}}>去开通/升级 →</a>
      </p>
      {left !== null && <p className="small">今日剩余额度：{left} 次</p>}
      {error && <p style={{color:'salmon'}}>{error}</p>}
      {results.map((r,i)=><div key={i} className="card" style={{whiteSpace:'pre-wrap'}}>{r}</div>)}
    </div>
  );
}
