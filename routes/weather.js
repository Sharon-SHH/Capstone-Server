const express = require("express");
const router = express();
const axios = require("axios");
KEY = "c135c35a2372db5080966e06437bf429";

const cities = async (req, res) => {
    try {
        const input = req.query.search;
        const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${KEY}`;
        const response = await axios.get(locationUrl);
        const cityData = response.data;
        if(!cityData) {
            return res.status(400).json({error: "No such city"});
        }
        // count country: if multiple cities have the same name in a country, "name,state,country"
        const stateCount = {};
        cityData.forEach(element => {
            stateCount[element.country] =
              (stateCount[element.country] || 0) + 1;
        });
        const selectedOptions = cityData
          .map((item) => {
            // when the multiple cities have the same name in the country
            if (stateCount[item.country] > 1 && item.state) {
              return `${item.name},${item.state || ""},${item.country}`;
            } else {
              return `${item.name},${item.country}`;
            }
          });
        const sortedOptions = selectedOptions.sort();
        res.json(sortedOptions);
    } catch (error) {
        res.status(500).json({error: `${error}: Server doesn't work`});
    }
   
}
const weatherData = async (req, res) => {
    try {
        const city = req.query.search;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;
        const response = await axios.get(weatherUrl);
        const weather = response.data;
        if (!weather) {
            return res.status(400).json({ error: "No such city" });
        }
        res.status(200).json(weather);

    } catch (error) {
        res.status(500).json({ error: `${error}: Server doesn't work` });
    }
}
router.get("/city", cities);
router.get("/", weatherData);

module.exports = router;

