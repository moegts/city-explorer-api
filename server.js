"use strict";

const server = require('express');
const app = server();
const cors = require('cors')
const axios = require('axios');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;


app.get("/",(req,res) => {
    res.status(200).json({
        "message":"Welcome:to the server"
    })
})

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

let handleMovie = async (req,res)=>{
    let key = process.env.MOVIE_API_KEY;
    let country = req.query.searchCity;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${country}`
    let axiosData = await axios.get(url);
    let moivieData = axiosData.data;
    let cleanedData = moivieData.results.map(item=>{
        return new movie(
            item.title,
            item.overview,
            item.vote_average,
            item.vote_count,
            item.poster_path,
            item.popularity,
            item.release_date,
            );
    })
    res.status(200).json(cleanedData);
}
app.get('/movie', handleMovie)

// Model weather
class weatherBit{
    constructor(date,description){
        this.date=date;
        this.description=description;
    }
}

// Model movie
class movie{
    constructor(
        title,
        overview,
        vote_average,
        vote_count,
        poster_path,
        popularity,
        release_date){
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.poster_path = "https://image.tmdb.org/t/p/w500" + poster_path;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}

app.listen(PORT, () => {
    console.log(`ON ${PORT}`);
});