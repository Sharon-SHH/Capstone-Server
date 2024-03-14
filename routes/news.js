const express = require("express");
const router = express();
const NewsAPI = require("newsapi");
const KEY = "YourKey";
const newsapi = new NewsAPI(KEY);
const fs = require("fs");

const KEY_AI = "YourKey";
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
  console.log(req.params);
  const newsapi = new NewsAPI(KEY);
  await newsapi.v2
    .sources({
      category: categories,
      language: "en",
      country: "us,ca",
    })
    .then((response) => {
      console.log(response);
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
       console.log(response.articles.results);
       const jsonData = JSON.stringify(response.articles.results, null, 2); 
       fs.writeFile("data.json", jsonData, (err) => {
         if (err) {
           console.error("Error writing to file:", err);
           return;
         }
         console.log("Data saved to data.json");
       });
       res.json(response);
     });       
}

const topicData = (req, res) => {
  const q = new erBase.GetTrendingConcepts({ source: "news", count: 10 });
  er.execQuery(q).then((response) => {
    console.info(response);
    res.json(response).catch((error) => {
      res.status(500).json({
        error: `${error}An error occurred while fetching news sources.`,
      });
    });
  });
}


router.get("/:parameter", fetchNewsData);
// router.get("/", newsData);
router.get("/", detailNews);
module.exports = router;
