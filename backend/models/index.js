const mongoose = require('mongoose');
require("dotenv").config()
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`,
  options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000
  }

mongoose.connect(uri, options)
  .then(() => console.log("DATABASE: connected"))
  .catch(error => console.log(`DATABASE ERROR: ${error}`))

// import the video and user models
module.exports.Video = require("./video")
module.exports.User = require("./user")