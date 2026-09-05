const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return res.status(200).json({ ok: false });
  }

  try {
    const up = await fetch(`${redisUrl}/incr/issued`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['issued']),
    });
    if (!up.ok) return res.status(200).json({ ok: false });
    const data = await up.json();
    const n = parseInt(data.result, 10);
    return res.status(200).json({ ok: true, issued: Number.isFinite(n) ? n : null });
  } catch {
    return res.status(200).json({ ok: false });
  }
};

export default handler;
