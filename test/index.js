const fs = require("fs");
const ytdl = require("ytdl-core");

ytdl('https://www.youtube.com/watch?v=lXxUPo9tRao').pipe(fs.createWriteStream('video.mp4'));
