const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./src/utils/logger");
const router = require("./src/routes/uploader");

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  logger.info("Home Page");
  res.send("Hello World! This is the home page of the cgonverter");
});

app.post("/", (req, res) => {
  logger.info("Home Page");
  console.log(req.body);
  res.sendStatus(200);
});

app.use("/upload", router);
//app.use(router);

app.listen(port, () => {
  console.log(`Project running at http://localhost:${port}`);
});
