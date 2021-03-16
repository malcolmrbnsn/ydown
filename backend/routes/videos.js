
const ytdl = require('ytdl-core'),
  router = require("express").Router(),
  fs = require("fs"),
  path = require('path'),
  db = require("../models")

router.get("/", async (req, res) => {
  let videos = await db.Video.find();
  return res.status(200).json(videos);
})

router.get("/:id", async (req, res) => {
  let video = await db.Video.findOne({ videoId: req.params.id })
  return res.status(200).json(video)
})

router.post("/:id", async (req, res) => {
  try {
    let info = await ytdl.getInfo(req.params.id)
    let video = new db.Video({
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      length: info.videoDetails.lengthSeconds,
      channel: info.videoDetails.author.name,
      uploadDate: info.videoDetails.uploadDate,
      videoId: req.params.id,
      downloaded: false
    })
    await video.save()
    return res.status(201).json(video)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    let video = await db.Video.findOne({ videoId: req.params.id });
    await db.Video.findOneAndDelete({ videoId: req.params.id });
    if (video.downloaded) {
      fs.unlinkSync(path.join(__dirname, "../", "public", "video", req.params.id + ".mp4"))
    }
    return res.status(204).json({ success: true })

  } catch (error) {
    console.log(error)
    return res.status(500).json({error});
  }
})

module.exports = router