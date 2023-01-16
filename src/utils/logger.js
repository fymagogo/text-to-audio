require("dotenv").config();
const winston = require("winston");
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: combine(
    winston.format.colorize(),
    label({ label: "Text-To-Speech" }),
    timestamp(),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
