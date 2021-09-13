"use strict";
const server = require('express');
const app = server();
const cors = require('cors')
app.use(cors());
require('dotenv').config();
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;

app.get('/test', (req, res) => {
    res.status(200).send("test");
});
app.get('/weather', (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    let searchInQuery = "";
    if (lat && lon) {
        searchInQuery = weatherData.find(i => i.lat === lat && i.lon === lon)
            ;
        if (searchInQuery) {
            let foreCast = searchInQuery.data.map(i => {
                return {
                    date: i.datetime,
                    description: i.weather.description,
                }

            })
            let result = { cityName: searchInQuery.city_name, foreCast: foreCast };
            res.status(200).json(result);
        } else {
            res.status(400).send("not found")
        }
    }
    else {
        res.status(400).send("provide correct query params please");
    }
})

app.listen(PORT, () => {
    console.log(`ON ${PORT}`);
});