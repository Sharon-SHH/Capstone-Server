require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const weather = require("./func/weather");
const news = require("./func/news");
PORT = process.env.PORT || 8080;
app.use(cors());

app.use("/weather", weather);
app.use("/news", news);

app.listen(PORT, ()=>{
    console.log(`Listen to ${PORT}`);
})