const ytdl = require("ytdl-core"),
  fs = require("fs"),
  path = require("path"),
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

function checkDirSync(dir) {
  try {
    fs.statSync(dir);
  } catch (e) {
    fs.mkdirSync(dir);
  }
}

class Downloader {
  constructor() {
    // check the file exists
    checkFileSync("/persist/options.json");

    // read the file, parse data from it
    let data = fs.readFileSync("/persist/options.json");
    let options = JSON.parse(data);

    // set object options and start the scheduler
    this.options = options;
    this.scheduler = schedule.scheduleJob(options, this.downloadVideos.bind(this));
    console.log("DOWNLOADER: started");
  }

  updateSchedule(newOptions) {
    // update the object
    this.options = newOptions;
    console.info(
      `DOWNLOADER: Schedule changed to ${this.options.enabled}. New time: ${this.options.hours}:${this.options.minutes}`
    );

    // reset the scheduler
    this.scheduler.reschedule(newOptions);

    // save to file
    fs.writeFileSync("/persist/options.json", JSON.stringify(newOptions));
  }

  async downloadVideos() {
    if (this.options.enabled) {
      // check the directories exist
      checkDirSync("/persist/media");
      checkDirSync("/persist/media/video");
      checkDirSync("/persist/media/thumbnail");

      // get list of videos to download
      let videos = await db.Video.find({ downloaded: false });

      // for each video
      videos.forEach(async (video) => {
        try {
          const id = video.videoId;

          // set filenames and path
          const videoFilename = id + ".mp4";
          const thumbFilename = id + ".png";
          const basePath = "/persist/media/";

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
                "1280x720"
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
