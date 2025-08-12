import { useState } from 'react';
import Head from 'next/head';

export default function Generator(){
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if(!input.trim()) return;
    setLoading(true);
    setError('');
    try{
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attack: input })
      });
      const data = await res.json();
      if(res.ok){
        setResults(data.items);
      } else {
        setError(data.error || '生成失败');
      }
    } catch(e){
      setError('网络错误');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>PUA 话术生成器</title>
      </Head>
      <div className="container">
        <h1>PUA 话术生成器</h1>
        <p>输入攻击词，比如「你太敏感了」→ 秒出优雅反击</p>
        <input
          className="input"
          placeholder="请输入攻击语"
          value={input}
          onChange={e=>setInput(e.target.value)}
        />
        <p>
          <button className="btn" onClick={handleGenerate} disabled={loading}>
            {loading ? '生成中...' : '生成'}
          </button>
        </p>
        {error && <p style={{color:'red'}}>{error}</p>}
        {results.length > 0 && (
          <div>
            <h2>结果</h2>
            {results.map((r, i) => (
              <div key={i} className="card">
                {r}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
