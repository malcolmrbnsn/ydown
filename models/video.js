const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  downloaded: {
    type: Boolean,
    default: false,
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Video", VideoSchema);
