require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const weather = require("./routes/weather");
const news = require("./routes/news");
const tasks = require("./routes/tasks");
PORT = process.env.PORT || 8080;
app.use(cors());

app.use("/tasks", tasks);
app.use("/weather", weather);
app.use("/news", news);

app.listen(PORT, ()=>{
    console.log(`Listen to ${PORT}`);
})