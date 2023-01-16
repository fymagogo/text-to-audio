const { Polly, S3 } = require("aws-sdk");
const uuid = require("uuid");
const logger = require("../utils/logger");
const fs = require("fs");

const polly = new Polly({
  accessKeyId: "accessKey",
  secretAccessKey: "secretAccessKey",
  region: "region",
});
const s3 = new S3();

function synthesizer(text) {
  const params = {
    OutputFormat: "mp3",
    Engine: "standard",
    Text: text,
    VoiceId: "Joanna",
    SampleRate: "8000",
    TextType: "text",
  };

  try {
    polly.synthesizeSpeech(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        fs.writeFile("./src/audios/audio.mp3", data.AudioStream, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
      } // successful response
      /*
            data = {
             AudioStream: <Binary String>, should be of a Buffer Type
             ContentType: "audio/mpeg",
             RequestCharacters: 37
            }
            */
    });
    //console.log(text);
  } catch (err) {
    logger.error("An error occured whiles synthesizing: ", err);
  }
}

module.exports = { synthesizer };
