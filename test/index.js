const fs = require("fs");
const ytdl = require("ytdl-core");


async function getVideo() {
  ytdl.getInfo('lXxUPo9tRao')
  .then(info => console.log(info))
  .catch(err => console.log(err))

}

getVideo()