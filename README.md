# PUA 话术生成器 · MVP

一个可直接部署到 **Vercel** 的最小可用版本：
- `/` 落地页（卖点+示例）
- `/generator` 生成器页面（输入攻击词 → 生成优雅反击）
- `/api/generate` 生成接口（模板生成，无依赖外部模型）
- 简易限流（未登录每小时 20 次，按 IP）

## 本地运行
```bash
npm i
npm run dev
# 浏览器打开 http://localhost:3000
