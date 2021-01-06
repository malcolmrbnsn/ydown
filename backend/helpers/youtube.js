const fs = require("fs");
const youtubedl = require("youtube-dl");


/**
 * @param {string} url URL of the video to download
 * @returns {object} Video information
 */
async function getVideo(url) {
  info = youtubedl.getInfo(url, (err, info) => {
    return info
  })
return info
}

module.exports = {getVideo};