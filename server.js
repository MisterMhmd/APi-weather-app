const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const API_KEY = process.env.API;

const cities = ["Riyadh", "Jeddah", "Makkah", "Dammam", "Madinah"];
const lat = [24.713552, 21.485811, 21.389082, 26.420683, 24.4672];
const lon = [46.6753, 39.1611, 39.8173, 50.0888, 39.6024];

app.get('/weather', async (req, res) => {
    const today = new Date().toJSON().slice(0, 10);
    const promises = [];

    for (let i = 0; i < cities.length; i++) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat[i]}&lon=${lon[i]}&appid=${API_KEY}&units=metric`;
        promises.push(axios.get(url));
    }

    try {
        const responses = await Promise.all(promises);
        const results = responses.map((response, i) => {
            const match = response.data.list.find(item => item.dt_txt.includes(today));
            return {
                city: cities[i],
                temperature: match.main.temp,
                weather: match.weather[0].main
            };
        });

        res.json(results);
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
