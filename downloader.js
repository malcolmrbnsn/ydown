const schedule = require("node-schedule"),
    ytdl = require('ytdl-core'),
    fs = require("fs"),
    path = require("path"),
    ffmpeg = require('ffmpeg-static'),
    genThumbnail = require('simple-thumbnail'),
    db = require("./models")
require("dotenv").config();

async function downloadVideos() {
    // get list of videos to download
    let videos = await db.Video.find({ downloaded: false });
    console.log(videos)
    // for each video
    videos.forEach(async video => {
        try {
            const id = video.videoId

            const videoFilename = id + ".mp4"
            const thumbFilename = id + ".png"

            console.log("downloading video: " + id)
            ytdl(id)
                .pipe(fs.createWriteStream(path.join(__dirname, "public", "video", filename))) // pipe the video data to the file path
                .on("close", async () => {
                    // log to console success
                    console.log("downloaded video");

                    //generate thumbnail
                    await genThumbnail('./public/video/' + filename, 'public/video/' + thumbFilename, "1280x720", { path: ffmpeg.path });
                    console.log("generated thumbnail")

                    // update downloaded status in the database
                    await db.Video.findOneAndUpdate({ videoId: id }, { downloaded: true, hasThumbnail: true });
                })
        } catch (error) {
            console.log("downloader error: " + error)
        }
    });
}

// set the schedule to run at 1AM everyday
// const job = schedule.scheduleJob('0 1 * * *', downloadVideos)
const job = schedule.scheduleJob('* * * * *', downloadVideos)
console.log("DOWNLOADER: ready")