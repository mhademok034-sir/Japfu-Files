export default async function handler(req, res) {
  const RELEASE_DATE = new Date('2024-12-25T12:00:00Z').getTime();
  const LOCAL_VIDEO_URL = '/videos/secret-video.mp4';

  // CORS headers FIRST
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (Date.now() < RELEASE_DATE) {
    res.status(403).json({ error: 'Not released yet' });
    return;
  }

  res.status(200).json({ videoUrl: LOCAL_VIDEO_URL });
}
