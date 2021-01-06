const fs = require("fs");
const ytdl = require("ytdl-core");


ytdl.getInfo('https://www.youtube.com/watch?v=qtpzwpp4Yik')
  .then(data => console.log(data))


