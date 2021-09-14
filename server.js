"use strict";

const server = require('express');
const app = server();
const cors = require('cors')
const axios = require('axios');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;

const weatherData = require('./data/weather.json');

let handleWeather = async (req,res)=>{
    let key = process.env.WEATHERBIT_API_KEY;
    let city = req.query.searchCity;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`
    let axiosData = await axios.get(url);
    let weatherData = axiosData.data;
    let cleanedData = weatherData.data.map(item=>{
        return new weatherBit(item.datetime,item.weather.description);
    })
    res.status(200).json(cleanedData);
}
app.get('/weather', handleWeather)

// Model
class weatherBit{
    constructor(date,description){
        this.date=date;
        this.description=description;
    }
}

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