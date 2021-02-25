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
            .pipe(fs.createWriteStream(path.join(__dirname, "public", "video", filename)))
            .on("close", async () => {
                console.log("downloaded video: " + id)
                await db.Video.findOneAndUpdate({videoId: id}, {downloaded: true, url: "/video/" + filename})
            })
    });
}

downloadVideos();

const job = schedule.scheduleJob('0 1 * * *', downloadVideos)
