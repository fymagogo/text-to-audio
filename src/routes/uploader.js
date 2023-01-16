const express = require("express");
const logger = require("../utils/logger");
const router = express.Router();
var fs = require("fs");
var multer = require("multer");
const fileUpload = multer({ storage: multer.memoryStorage() });
const { synthesizer } = require("../utils/synthesizer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
var command = ffmpeg();

router.use((req, res, next) => {
  console.log("Upload Page");
  logger.debug("Time Upload Page Was Hit: ", Date.now);
  next();
});

// define the base upload route
router.get("/", (req, res) => {
  res.send("Upload home page");
});

router.post(
  "/video",
  fileUpload.single("videoFile"),
  async function (req, res, next) {
    if (!req.file) return res.status(406).send("Missing Video File");
    if (!req.body.audioText) return res.status(406).send("Missing Text File");
    // fs.writeFile("./src/audios/video.mp4", req.file.buffer, (err) => {
    //   if (err) throw err;
    //   console.log("The video has been saved!");
    // });
    // var text = req.body.audioText;

    //await synthesizer(text);
    var home = path.resolve(__dirname, "../audios");
    var firstFile = `${home}/naa.mov`;
    var secondFile = `${home}/audio.mp3`;
    var outPath = "outs.mp4";

    // var proc = ffmpeg(firstFile)
    //   .complexFilter(["scale=640:480[rescaled]"])
    //   .input(secondFile)
    //   //.input(fourthFile)
    //   //.input(...)
    //   .on("end", function () {
    //     console.log("files have been merged succesfully");
    //   })
    //   .on("stderr", (stderrLine) => {
    //     console.log(stderrLine);
    //   })
    //   .on("error", function (err) {
    //     console.log("an error happened: " + err.message);
    //   })
    //   .mergeToFile(outPath);

    ffmpeg()
      .addInput(firstFile) //your video file input path
      .addInput(secondFile) //your audio file input path
      // .output(output) //your output path
      // .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy', '-shortest'])
      .saveToFile(outPath);

    res.status(200).json({
      response: "help",
      twat: "fjsdvf",
    });

    //res.sendFile("/src/audios/audio.mp3");
    // await fs.readFile("../audios/ge.txt", function (err, result) {
    //   console.log(result);
    //   //res.send(result.toString("base64"));
    // });
    //res.sendFile("/src/audios/ge.txt");
    //res.sendStatus(200);
  }
);

// router.get("/video", async function (req, res, next) {
//   var text = req.body.audioText;`
//   //console.log(req.body.audioText); //other text fields are on the body
//   //console.log(req.file); //file
//   //console.log(req.file.buffer);
//   console.log("running");
//   //await synthesizer(text);
//   console.log("about to get the file");
//   //res.set("Content-Type", "audio/mpeg");
//   //res.send("FISH");

//   // var options = {
//   //   // root: path.join(__dirname),
//   //   root: path.resolve(__dirname, "../audios"),
//   // };
//   // var fileName = "audio.mp3";
//   // res.sendFile(fileName, options);
//   await fs.readFile("src/audios/audio.mp3", function (err, result) {
//     console.log(result);
//     res.send(result.toString("base64"));
//   });
//   //res.sendFile("/src/audios/ge.txt");
//   //res.sendStatus(200);
// });

// define the about route
// router.get("/about", (req, res) => {
//   res.send("Upload about page");
// });

module.exports = router;
