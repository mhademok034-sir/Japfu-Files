export default async function handler(req, res) {
  // 🔥 SAME 12-HOUR TIMESTAMP
  const RELEASE_DATE = new Date(Date.now() + 12 * 60 * 60 * 1000).getTime();
  const LOCAL_VIDEO_URL = '/videos/secret-video.mp4';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (Date.now() < RELEASE_DATE) {
    res.status(403).json({ error: 'Video locked for 12 more hours' });
    return;
  }

  res.status(200).json({ videoUrl: LOCAL_VIDEO_URL });
}
