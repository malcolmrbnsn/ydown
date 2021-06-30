const ytdl = require("ytdl-core"),
  fs = require("fs"),
  path = require("path"),
  ffmpeg = require("ffmpeg-static"),
  schedule = require("node-schedule"),
  genThumbnail = require("simple-thumbnail"),
  db = require("../models");
require("dotenv").config();

let defaults = {
  enabled: true,
  hours: 1,
  minutes: 0,
};

function checkFileSync(file) {
  try {
    fs.statSync(file);
  } catch (e) {
    fs.writeFileSync(file, JSON.stringify(defaults));
  }
}

class Downloader {
  constructor() {
    // check the file exists
    checkFileSync("../options.json");

    // read the file, parse data from it
    let data = fs.readFileSync("./options.json");
    let options = JSON.parse(data);

    // set object options and start the scheduler
    this.options = options;
    let rule = schedule.RecurrenceRule(options);
    this.scheduler = schedule.scheduleJob(rule, this.downloadVideos.bind(this));
    console.log("DOWNLOADER: started");
  }

  updateSchedule(newOptions) {
    // update the object
    this.options = newOptions;
    console.info(
      `DOWNLOADER: Schedule changed to ${this.options.enabled}. New time: ${this.options.hours}:${this.options.minutes}`
    );

    // reset the scheduler
    let rule = schedule.RecurrenceRule(options);
    this.scheduler.reschedule(rule);

    // save to file
    fs.writeFileSync("./options.json", JSON.stringify(newOptions));
  }

  async downloadVideos() {
    if (this.options.enabled) {
      // get list of videos to download
      let videos = await db.Video.find({ downloaded: false });

      // for each video
      videos.forEach(async (video) => {
        try {
          const id = video.videoId;

          // set filenames and path
          const videoFilename = id + ".mp4";
          const thumbFilename = id + ".png";
          const basePath = "./public/";

          console.log("downloading video: " + id);
          ytdl(id)
            .pipe(
              fs.createWriteStream(path.join(basePath, "video", videoFilename))
            ) // pipe the video data to the file path
            .on("close", async () => {
              // log to console success
              console.log("downloaded video " + id);

              // generate thumbnail
              await genThumbnail(
                path.join(basePath, "video", videoFilename),
                path.join(basePath, "thumbnail", thumbFilename),
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
    } else {
      console.log("DOWNLOADER: skipped");
    }
  }
}

module.exports = Downloader;
