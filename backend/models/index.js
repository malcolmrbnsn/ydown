const mongoose = require('mongoose');
require("dotenv").config()

const uri = process.env.MONGODB_URI + '/ydown'|| 'mongodb://127.0.0.1/ydown'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

module.exports.Video = require("./video")
module.exports.User = require("./user")