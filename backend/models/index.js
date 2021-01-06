const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/ydown'
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

module.exports.Video = require("./video")