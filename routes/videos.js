const ytdl = require('ytdl-core'),
  router = require("express").Router(),
  fs = require("fs"),
  path = require('path'),
  db = require("../models")
const { runInNewContext } = require('vm');
const { checkLogin } = require("../middleware/auth");
const video = require('../models/video');

router.get("/", async (req, res) => {
  // get all videos from the database
  let videos = await db.Video.find().sort({ date: 'ascending' }).lean().exec();
  // return to user
  return res.render("videos/library", { videos, title: "Library" })
})

router.post("/", async (req, res) => {
  try {
    if (!req.body.url) {
      req.flash("error", "Please enter a video URL")
      return res.redirect("/videos")
    }

    // get the video ID from the URL
    let id = new URL(req.body.url).searchParams.get("v")

    // get the video information from youtube
    let info = await ytdl.getInfo(id)

    // save information into a new database entry
    let video = new db.Video({
      videoId: id,
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      channel: info.videoDetails.author.name,
      uploadDate: info.videoDetails.uploadDate,
      length: info.videoDetails.lengthSeconds,
      downloaded: false,
      watched: false
    })

    // save to database
    await video.save()

    // return success to user with the video
    req.flash("success", "Video added")
    return res.redirect("/videos")
  } catch (error) {
    console.log(error)
    // return the error to the use
    req.flash("error", "An error occured")
    res.redirect("/videos")
  }
})

router.get("/:id/watched", async (req, res) => {
  try {
    // get the video from the database
    let video = await db.Video.findById(req.params.id);

    // toggle the watched status
    video.watched = !video.watched;

    // save to database
    await video.save()

    return res.redirect("/videos")
  } catch (error) {
    console.log(error)
    // return the error to the use
    req.flash("error", "An error occured")
    return res.redirect("/videos")
  }
})

router.get("/:id", async (req, res) => {
  try {
    // get the video from the database
    let video = await db.Video.findById(req.params.id).lean();

    if (!video) {
      req.flash("error", "Invalid video")
      return res.redirect("/videos")
    }

    return res.render("videos/show", { video, title: video.title })
  } catch (error) {
    console.log(error)
    // return the error to the use
    req.flash("error", "An error occured")
    res.redirect("/videos")
  }
})

router.delete("/:id", checkLogin, async (req, res) => {
  try {
    // find the video in the database
    let video = await db.Video.findOne({ videoId: req.params.id });

    // delete the video from database
    await db.Video.findOneAndDelete({ videoId: req.params.id });

    // if video was downloaded
    if (video.downloaded) {
      // delete the video from disk
      fs.unlinkSync(path.join(__dirname, "../", "public", "videos", req.params.id + ".mp4"))
    }

    // return the success status with message
    return res.redirect("/videos")
  } catch (error) {
    console.log(error)
    // return the error to the use
    req.flash("error", "An error occured")
    res.redirect("/videos")
  }
})

module.exports = router