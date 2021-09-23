'use strict';
const Movie = require("../models/Handlemovie.model");
const axios = require('axios');
const Cache = require("../helpers/cache");
let cache = new Cache();
let cacheCountry;
let handleMovie = async (req,res)=>{
    let currentDate = new Date();
    let country = req.query.searchCity;
    if (cache.data.length > 0 && cache.date.getDate() === currentDate.getDate() && country === cacheCountry){
        res.json(cache);
    }else{
        let key = process.env.MOVIE_API_KEY;
        let country = req.query.searchCity;
        cacheCountry = country;
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${country}`
        let axiosData = await axios.get(url);
        let moivieData = axiosData.data;
        let cleanedData = moivieData.results.map(item=>{
            return new Movie(
                item.title,
                item.overview,
                item.vote_average,
                item.vote_count,
                item.poster_path,
                item.popularity,
                item.release_date,
                );
        })
        cache.data=cleanedData;
        res.status(200).json(cleanedData);
    }


};
module.exports = handleMovie;