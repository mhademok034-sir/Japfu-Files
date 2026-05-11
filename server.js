const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Set the release time: Current time + 12 hours
// For a specific date, use: new Date('2024-12-31T12:00:00Z').getTime()
const RELEASE_TIME = Date.now() + (12 * 60 * 60 * 1000);

app.use(express.static('public'));

// Endpoint to check time remaining
app.get('/api/status', (req, res) => {
    const now = Date.now();
    const timeLeft = Math.max(0, RELEASE_TIME - now);
    res.json({
        released: timeLeft === 0,
        timeLeft: timeLeft // returns milliseconds
    });
});

// Secure endpoint to get the video source
app.get('/api/video-link', (req, res) => {
    if (Date.now() >= RELEASE_TIME) {
        // Replace with your actual video URL or file path
        res.json({ url: 'https://www.w3schools.com/html/mov_bbb.mp4' });
    } else {
        res.status(403).json({ error: 'Access Denied: Countdown still active.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Video will be released at: ${new Date(RELEASE_TIME).toLocaleString()}`);
});
