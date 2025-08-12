import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* 探针样式：部署后如果你看到页面四周出现紫色边框，说明全局样式渲染链路OK */}
      <style jsx global>{`
        body { outline: 4px solid rebeccapurple; }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
