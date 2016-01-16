/**
 * These functions were taken/modified from zen-audio-player/zen-audio-player.github.io
 * https://github.com/zen-audio-player/zen-audio-player.github.io/blob/04eb63d5f520fa6aa6ca9805c669e25c75e6b341/js/everything.js
 */

module.exports.getParameterByName =function (url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

module.exports.parseYoutubeVideoID = function(url) {
    var videoID = null;

    var shortUrlDomain = "youtu.be";
    var longUrlDomain = "youtube.com";

    if (url && url.length > 0) {
        // youtube.com format
        if (url.indexOf(longUrlDomain) !== -1) {
            videoID = module.exports.getParameterByName(url, "v");
            // If the URL had 2 v parameters, try parsing the second (usually when ?v=someurl&v=xyz)
            if (videoID === "") {
                videoID = module.exports.getParameterByName(window.location.href.substring(window.location.href.indexOf(url)), "v");
            }
        }
        // youtu.be format
        else if (url.indexOf(shortUrlDomain) !== -1) {
            var endPosition = url.indexOf("?") === -1 ? url.length : url.indexOf("?");
            var offset = url.indexOf(shortUrlDomain) + shortUrlDomain.length + 1; // Skip over the slash also
            videoID = url.substring(offset, endPosition);
        }
        // Assume YouTube video ID string
        else {
            videoID = url;
        }

        var slashPos = videoID.indexOf("/");
        // We found a slash in the video ID (ex: real id is ABC123, but saw ABC123/zen)
        // So, only keep what's before the slash
        if (slashPos !== -1) {
            videoID = videoID.substring(0, slashPos);
        }

        currentVideoID = videoID;

        return videoID;
    }
    return null;
};