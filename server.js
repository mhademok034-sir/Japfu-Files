const express = require('express');
const path = require('path');
const app = express();

// SET YOUR EXACT RELEASE DATE HERE (Year, Month[0-11], Day, Hour, Min, Sec)
// Example: May 12, 2026, at 10:00 AM
const RELEASE_DATE = new Date(2026, 4, 12, 10, 0, 0).getTime(); 

app.use(express.static('public'));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.get('/api/status', (req, res) => {
    const timeLeft = Math.max(0, RELEASE_DATE - Date.now());
    res.json({ released: timeLeft === 0, timeLeft });
});

app.get('/api/video-link', (req, res) => {
    if (Date.now() >= RELEASE_DATE) {
        // Points to your file in the /videos folder
        res.json({ url: '/videos/your-movie.mp4' }); 
    } else {
        res.status(403).json({ error: "Nice try! It's not time yet." });
    }
});

app.listen(3000, () => console.log('Vault Server running on port 3000'));
