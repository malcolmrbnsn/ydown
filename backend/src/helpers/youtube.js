const fs = require("fs");
const ytdl = require("ytdl-core");


async function getVideo(url) {
  ytdl.getInfo(url)
  .then(info => console.log(info))
  .catch(err => console.log(err))

}

getVideo()%
