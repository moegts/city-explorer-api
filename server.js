"use strict";
const server = require('express');
const app = server();
const cors = require('cors')
require('dotenv').config();
const handleWeather = require("./controller/Handleweather.controller");
const handleMovie = require("./controller/Handlemovie.controller")
app.use(cors());
const PORT = process.env.PORT;
app.get("/", (req, res) => res.status(200).json({ "message": "Welcome:to the server" }))
app.get('/weather', handleWeather)
app.get('/movie', handleMovie)
app.listen(PORT, () => console.log(`ON ${PORT}`));