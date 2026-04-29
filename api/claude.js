// Vercel Serverless Function — 把前端的请求转发给 Anthropic API。
// API Key 通过 Vercel 的环境变量读取,不会暴露到浏览器里。
// 部署到 Vercel 之后,会自动对应 /api/claude 这个路径。

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: 'API Key 未配置。请在 Vercel 项目的 Settings → Environment Variables 里添加 ANTHROPIC_API_KEY。',
    });
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: '调用 Claude API 失败:' + error.message });
  }
}
