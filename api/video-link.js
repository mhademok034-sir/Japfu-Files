export default function handler(req, res) {
    const RELEASE_DATE = new Date("2026-05-11T23:32:00").getTime();
    const now = Date.now();

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (now >= RELEASE_DATE) {
        // IMPORTANT: Change 'your-video.mp4' to your actual file name!
        res.status(200).json({ url: '/videos/your-video.mp4' });
    } else {
        res.status(403).json({ error: "Access Denied: Vault is locked." });
    }
}
