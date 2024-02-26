const express = require("express");
const router = express();
const NewsAPI = require("newsapi");
const KEY = "4876cff98d824fd29a57552fe624f829";
const newsapi = new NewsAPI(KEY);
const fs = require("fs");

const KEY_AI = "37140e06-a90e-4a77-943f-f3b29ede3670";
var erBase = require("eventregistry");
var er = new erBase.EventRegistry({ apiKey: KEY_AI});

// Get all news
const newsData = async (req, res)=> {
    await newsapi.v2
      .sources({
        category: '',
        language: "en",
        country: "us",
      })
      .then((response) => {
        const { sources } = response;
        res.json(sources);
      })
      .catch((error) => {
        res.status(500).json({
          error: `${error}An error occurred while fetching news sources.`,
        });
      });
}

// get a certain category of news
const fetchNewsData = async (req, res) => {
  const categories = req.params.parameter;
  const newsapi = new NewsAPI(KEY);
  await newsapi.v2
    .sources({
      category: categories,
      language: "en",
      country: "us",
    })
    .then((response) => {
      const { sources } = response;
      res.json(sources);
    })
    .catch((error) => {
      res.status(500).json({
        error: `${error}An error occurred while fetching news sources.`,
      });
    });
};

// Show details of the news
const detailNews = async (req, res) => {
  er.getCategoryUri("business")
     .then((categoryUri) => {
       var q = new erBase.QueryArticles({
         categoryUri: categoryUri,
         isDuplicateFilter: "keepOnlyDuplicates", // possible values are "skipDuplicates" or "keepOnlyDuplicates" or "keepAll";
       });
       return er.execQuery(q);
     })
     .then((response) => {
       const jsonData = JSON.stringify(response.articles.results, null, 2); 
       fs.writeFile("data.json", jsonData, (err) => {
         if (err) {
           console.error("Error writing to file:", err);
           return;
         }
       });
       res.json(response);
     });       
}

router.get("/", detailNews);
router.get("/all", newsData);
router.get("/all/:parameter", fetchNewsData);

module.exports = router;
