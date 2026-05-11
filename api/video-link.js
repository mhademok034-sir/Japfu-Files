export default function handler(req, res) {
    // MUST MATCH STATUS.JS EXACTLY
    const RELEASE_DATE = new Date("2026-05-11T23:30:00").getTime();
    const now = Date.now();

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (now >= RELEASE_DATE) {
        // Change this to your actual video filename in the /videos folder
        res.status(200).json({ url: '/videos/your-video.mp4' });
    } else {
        res.status(403).json({ error: "Access Denied: Vault is locked." });
    }
}
