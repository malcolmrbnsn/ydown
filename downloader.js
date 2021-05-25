const schedule = require("node-schedule"),
  ytdl = require("ytdl-core"),
  fs = require("fs"),
  path = require("path"),
  ffmpeg = require("ffmpeg-static"),
  genThumbnail = require("simple-thumbnail"),
  db = require("./models");
require("dotenv").config();

async function downloadVideos() {
  // get list of videos to download
  let videos = await db.Video.find({ downloaded: false });
  // for each video
  videos.forEach(async (video) => {
    try {
      const id = video.videoId;

      const videoFilename = id + ".mp4";
      const thumbFilename = id + ".png";

      console.log("downloading video: " + id);
      ytdl(id)
        .pipe(
          fs.createWriteStream(
            path.join(__dirname, "public", "video", videoFilename)
          )
        ) // pipe the video data to the file path
        .on("close", async () => {
          // log to console success
          console.log("downloaded video " + id);

          // generate thumbnail
          await genThumbnail(
            path.join(__dirname, "public", "video", videoFilename),
            path.join(__dirname, "public", "thumbnail", thumbFilename),
            "1280x720",
            { path: ffmpeg.path }
          );
          console.log("generated thumbnail " + id);

          // update downloaded status in the database
          await db.Video.findOneAndUpdate(
            { videoId: id },
            { downloaded: true, hasThumbnail: true }
          );
          console.log("database updated");
        });
    } catch (error) {
      console.log("downloader error: " + error);
    }
  });
}

downloadVideos();
// set the schedule to run at 1AM everyday
schedule.scheduleJob("0 1 * * *", downloadVideos);
console.log("DOWNLOADER: ready");
