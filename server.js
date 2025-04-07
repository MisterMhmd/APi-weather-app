const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const API_KEY = process.env.API;
let lat = [];
let lon = [];
let SA_cities = [];

fs.readFile("./sa.json", "utf-8", (err, cities) => {
    if (err) {
        console.log("Error occured! " + err);
    } else {
        SA_cities = JSON.parse(cities);
        SA_cities.forEach(element => {
            lat.push(element.lat);
            lon.push(element.lng);
        });
    }
})


app.get('/weather', async (req, res) => {
    const today = new Date().toJSON().slice(0, 10);
    const promises = [];

    for (let i = 0; i < lat.length; i++) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat[i]}&lon=${lon[i]}&appid=${API_KEY}&units=metric`;
        promises.push(axios.get(url));
    }

    try {
        const responses = await Promise.all(promises);
        const results = responses.map((response, i) => {
            const match = response.data.list.find(item => item.dt_txt.includes(today));
            return {
                city: response.data.city.name,
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
