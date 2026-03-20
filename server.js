require('dotenv').config(); // Load .env variables
const express = require('express');
const fetch = require('node-fetch'); // Node 18+ has native fetch
const cors = require('cors');

const app = express();
app.use(cors()); // allow requests from frontend
app.use(express.static('public')); // serve frontend files

const PORT = 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'City not found' });
        }
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));