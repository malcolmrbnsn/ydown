const schedule = require("node-schedule"),
    ytdl = require('ytdl-core'),
    fs = require("fs"),
    path = require("path"),
    db = require("./models")

async function downloadVideos() {
    // get list of videos to download
    let videos = await db.Video.find({ downloaded: false });
    console.log(videos)
    // for each video
    videos.forEach(async video => {
        const id = video.videoId
        const filename = id + ".mp4"
        ytdl(id)
            .pipe(fs.createWriteStream(path.join(__dirname, "public", "video", filename))) // pipe the video data to the file path
            .on("close", async () => {
                // log to console success
                console.log("downloaded video: " + id)
                // update downloaded status in the database
                await db.Video.findOneAndUpdate({videoId: id}, {downloaded: true, url: "/video/" + filename})
            })
    });
}

// set the schedule to run at 1AM everyday
const job = schedule.scheduleJob('0 1 * * *', downloadVideos)
console.log("DOWNLOADER: ready")