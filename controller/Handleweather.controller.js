'use strict';
const WeatherBit = require("../models/Handelweather.model");
const axios = require('axios');
let handleWeather = async (req,res)=>{
    let key = process.env.WEATHERBIT_API_KEY;
    let city = req.query.searchCity;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`
    let axiosData = await axios.get(url);
    let weatherData = axiosData.data;
    let cleanedData = weatherData.data.map(item=>{
        return new WeatherBit(item.datetime,item.weather.description);
    })
    res.status(200).json(cleanedData);
}
module.exports = handleWeather;