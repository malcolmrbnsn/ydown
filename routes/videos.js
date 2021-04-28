const ytdl = require('ytdl-core'),
  router = require("express").Router(),
  fs = require("fs"),
  path = require('path'),
  db = require("../models")
const {checkAuth} = require("../middleware/auth")

router.get("/", async (req, res) => {
  // get all videos from the database
  let videos = await db.Video.find().sort({date: 'ascending'}).exec();

  // return to user
  return res.status(200).json(videos);
})

router.get("/:id", checkAuth, async (req, res) => {
  // find the video from the database
  let video = await db.Video.findOne({ videoId: req.params.id })

  // return to the user
  return res.status(200).json(video)
})

router.post("/:id", checkAuth, async (req, res) => {
  try {
    // get the video information from youtube
    let info = await ytdl.getInfo(req.params.id)

    // save information into a new database entry
    let video = new db.Video({
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      length: info.videoDetails.lengthSeconds,
      channel: info.videoDetails.author.name,
      uploadDate: info.videoDetails.uploadDate,
      videoId: req.params.id,
      downloaded: false
    })

    // save to database
    await video.save()

    // return success to user with the video
    return res.status(201).json(video)
  } catch (error) {
    // return the error to the user
    return res.status(500).send(error)
  }
})

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    // find the video in the database
    let video = await db.Video.findOne({ videoId: req.params.id });

    // delete the video from database
    await db.Video.findOneAndDelete({ videoId: req.params.id });

    // if video was downloaded
    if (video.downloaded) {
      // delete the video from disk
      fs.unlinkSync(path.join(__dirname, "../", "public", "video", req.params.id + ".mp4"))
    }
    // return the success status with message
    return res.status(204)

  } catch (error) {
    // log the error to console
    console.log(error)

    // return a server error with the error
    return res.status(500).json({error});
  }
})

module.exports = router
