const express = require("express");
const router = express();
const NewsAPI = require("newsapi");
const KEY = "4876cff98d824fd29a57552fe624f829";

const category = "technology,business";

const newsapi = new NewsAPI(KEY);


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

const fetchNewsData = async (req, res) => {
  const categories = req.params.parameter;
  console.log(req.params);
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

router.get("/:parameter", fetchNewsData);
router.get("/", newsData);
module.exports = router;
