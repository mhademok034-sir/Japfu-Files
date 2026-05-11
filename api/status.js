export default async function handler(req, res) {
  // 🔥 EXACTLY 12 HOURS FROM NOW (adjust timezone if needed)
  const RELEASE_DATE = new Date(Date.now() + 12 * 60 * 60 * 1000).getTime();
  
  const now = Date.now();
  const timeLeft = Math.max(0, RELEASE_DATE - now);
  const released = timeLeft === 0;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    released,
    timeLeft,
    hours: Math.floor(timeLeft / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (60 * 1000)),
    seconds: Math.floor((timeLeft % (60 * 1000)) / 1000)
  });
}
