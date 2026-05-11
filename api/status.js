export default function handler(req, res) {
    // CURRENT TIME IS: 2026-05-11 23:10
    // 12 HOURS FROM NOW IS: 2026-05-12 11:10 AM
    const RELEASE_DATE = new Date("2026-05-11T23:27:00").getTime(); 
    const now = Date.now();
    const timeLeft = Math.max(0, RELEASE_DATE - now);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
        released: timeLeft === 0,
        timeLeft: timeLeft
    });
}
