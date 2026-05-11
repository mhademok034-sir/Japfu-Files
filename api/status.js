export default function handler(req, res) {
    // UPDATED TEST TIME: May 11, 2026, at 11:30:00 PM
    const RELEASE_DATE = new Date("2026-05-11T23:30:00").getTime(); 
    const now = Date.now();
    const timeLeft = Math.max(0, RELEASE_DATE - now);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
        released: timeLeft === 0,
        timeLeft: timeLeft
    });
}
