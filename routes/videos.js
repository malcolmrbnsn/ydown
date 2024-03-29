const ytdl = require("ytdl-core"),
  router = require("express").Router(),
  fs = require("fs"),
  path = require("path"),
  Video = require("../models/video");
const { checkLogin } = require("../middleware/auth");

router.get("/", async (req, res) => {
  let unwatchedOnly = req.query.show === "unwatched"
  let videos;
 
  if (unwatchedOnly) {
    videos = await Video.find({watched: false}).sort({ date: "ascending" }).lean().exec();
  } else {
    videos = await Video.find().sort({ date: "ascending" }).lean().exec();
  }

  // return to user
  return res.render("videos/library", { videos, unwatchedOnly, title: "Library" });
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.url) {
      req.flash("error", "Please enter a video URL");
      return res.redirect("/videos");
    }

    // get the video ID from the URL
    let id = new URL(req.body.url).searchParams.get("v");

    // get the video information from youtube
    let info = await ytdl.getInfo(id);

    // save information into a new database entry
    let video = new Video({
      videoId: id,
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      channel: info.videoDetails.author.name,
      uploadDate: info.videoDetails.uploadDate,
      length: info.videoDetails.lengthSeconds,
      downloaded: false,
      watched: false,
    });

    // save to database
    await video.save();

    // return success to user with the video
    req.flash("success", "Video added");
    return res.redirect("/videos");
  } catch (error) {
    console.log(error);
    // return the error to the use
    req.flash("error", "An error occured");
    res.redirect("/videos");
  }
});

router.get("/:id/watched", async (req, res) => {
  try {
    // get the video from the database
    let video = await Video.findById(req.params.id);

    // toggle the watched status
    video.watched = !video.watched;

    // save to database
    await video.save();

    return res.redirect("/videos");
  } catch (error) {
    console.log(error);
    // return the error to the use
    req.flash("error", "An error occured");
    return res.redirect("/videos");
  }
});

router.get("/:id", async (req, res) => {
  try {
    // get the video from the database
    let video = await Video.findById(req.params.id).lean();

    if (!video) {
      req.flash("error", "Invalid video");
      return res.redirect("/videos");
    }

    return res.render("videos/show", { video, title: video.title });
  } catch (error) {
    console.log(error);
    // return the error to the use
    req.flash("error", "An error occured");
    res.redirect("/videos");
  }
});

router.delete("/:id", checkLogin, async (req, res) => {
  try {
    // find the video in the database
    let video = await Video.findById(req.params.id);

    if (!video) {
      // return the error to the user
      req.flash("error", "No video was found");
      return res.redirect("/videos");
    }

    // if video was downloaded
    if (video.downloaded) {
      // delete the video from disk
      fs.unlinkSync("/persist/media/video/" + video.videoId + ".mp4");
    }

    // Delete the video
    await video.remove();

    // return the success status with message
    req.flash("success", "Video deleted");
    return res.redirect("/videos");
  } catch (error) {
    console.log(error);
    // return the error to the user
    req.flash("error", "An error occured");
    return res.redirect("/videos");
  }
});

module.exports = router;
