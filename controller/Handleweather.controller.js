'use strict';
const WeatherBit = require("../models/Handelweather.model");
const Cache = require("../helpers/cache");
const axios = require('axios');
let cache = new Cache();
let cacheCountry;
let handleWeather = async (req,res)=>{
    let currentDate = new Date();
    let country = req.query.searchCity;
    if (cache.data.length > 0 && cache.date.getDate() === currentDate.getDate() && country === cacheCountry){
        res.json(cache);
    }else{
    let key = process.env.WEATHERBIT_API_KEY;
    let city = req.query.searchCity;
    
    cacheCountry = city;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`
    let axiosData = await axios.get(url);
    let weatherData = axiosData.data;
    let cleanedData = weatherData.data.map(item=>{
        return new WeatherBit(item.datetime,item.weather.description);
    })
    cache.data=cleanedData;
    res.status(200).json(cleanedData);
}
};
module.exports = handleWeather;