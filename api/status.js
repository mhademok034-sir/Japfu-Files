export default async function handler(req, res) {
  // Hardcoded release date - CHANGE THIS!
  const RELEASE_DATE = new Date('2024-12-25T12:00:00Z').getTime();
  
  const now = Date.now();
  const timeLeft = Math.max(0, RELEASE_DATE - now);
  const released = timeLeft === 0;

  // CORS headers FIRST
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({
    released,
    timeLeft,
    hours: Math.floor(timeLeft / (1000 * 60 * 60)),
    minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (60 * 1000)),
    seconds: Math.floor((timeLeft % (60 * 1000)) / 1000)
  });
}
