#!/usr/bin/env node

var open = require("open");
var contrib = require("./contrib");

var usage = "Usage: zap <YouTube URL | video ID | search query>";

if (process.argv.length < 3) {
    console.log(usage);
}
else if (process.argv.length === 3) {
    var destination = "https://zen-audio-player.github.io?";

    var videoID = contrib.parseYoutubeVideoID(process.argv[2]);
    if (videoID && videoID.indexOf(" ") === -1) {
        // Try to go to the video by ID, or URL if no spaces
        destination += "v=" + encodeURIComponent(videoID);
    }
    else {
        // Else, search for whatever we got
        destination += "q=" + encodeURIComponent(process.argv[2]);
    }

    open(destination);
}
else {
    // TODO: should we concatenate all random args into a search query?
    console.log(usage);
}