import "./VideoPlayerSample.css";
import React from "react";
import ReactPlayer from "react-player";

function VideoPlayerSample({ videoUrl, previewUrl, controls = true }) {
  return (
    <div className="video-wrapper">
      <ReactPlayer 
        url={videoUrl}
        className="video-player" 
        controls={controls} />
    </div>
  );
}

export default VideoPlayerSample;