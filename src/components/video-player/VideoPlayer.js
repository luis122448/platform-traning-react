import './VideoPlayer.css';
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl, previewUrl, controls = true }) => {
  const [state, setState] = useState({
    url: videoUrl,
    playing: false,
    seeking: false,
    started: false,
    ended: false,
    volume: 1.0,
    speed: 1.0,
    played: 0,
    loaded: 0,
    duration: 0,
  });
  const [volumeBarVisible, setVolumeBarVisible] = useState(false);

  const playerRef = useRef(null);

  const emitStateChange = (newState) => {
    const event = new CustomEvent('videoStateChange', { detail: newState });
    window.dispatchEvent(event);
  };

  const handlePlayPause = () => {
    setState((prevState) => {
      const newState = { ...prevState, playing: !prevState.playing };
      emitStateChange(newState);
      return newState;
    });
  };

  const handleVolumeChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState, volume: parseFloat(e.target.value) };
      emitStateChange(newState);
      return newState;
    });
  };

  const handlePlaybackRateChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState, speed: parseFloat(e.target.value) };
      emitStateChange(newState);
      return newState;
    });
  };

  const handleProgress = (progress) => {
    if (!state.seeking) {
      setState((prevState) => {
        const newState = { ...prevState, ...progress };
        emitStateChange(newState);
        return newState;
      });
    }
  };

  const handleDuration = (duration) => {
    setState((prevState) => {
      const newState = { ...prevState, duration };
      emitStateChange(newState);
      return newState;
    });
  };

  const handleEnded = () => {
    setState((prevState) => ({ ...prevState, ended: true }));
  };

  const handleSeekChange = (e) => {
    setState((prevState) => {
      const newState = { ...prevState, played: parseFloat(e.target.value) };
      emitStateChange(newState);
      return newState;
    });
  };

  const handleSeekMouseDown = () => {
    setState((prevState) => ({ ...prevState, seeking: true }));
  };

  const handleSeekMouseUp = (e) => {
    setState((prevState) => {
      const newState = { ...prevState, seeking: false };
      playerRef.current.seekTo(parseFloat(e.target.value));
      emitStateChange(newState);
      return newState;
    });
  };

  const toggleVolumeBar = () => {
    setVolumeBarVisible(!volumeBarVisible);
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, url: videoUrl }));
  }, [videoUrl]);

  return (
    <div className="video-wrapper">
      <ReactPlayer
        ref={playerRef}
        className="video-player"
        url={state.url}
        playing={state.playing}
        volume={state.volume}
        playbackRate={state.speed}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
        playsinline={true}
        width="100%"
        height="100%"
      />
      {controls && (
        <div className="controls">
          <button onClick={handlePlayPause} className="play-pause-btn">
            {state.playing ? '⏸️' : '▶️'}
          </button>
          <div className="progress-container">
            <input
              type="range"
              className="progress-bar"
              min={0}
              max={1}
              step="any"
              value={state.played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
            <div
              className="progress-bar-loaded"
              style={{ width: `${state.loaded * 100}%` }}
            />
          </div>
          <div className="volume-container">
            <button onClick={toggleVolumeBar} className="volume-btn">
              🔊
            </button>
            {volumeBarVisible && (
              <input
                type="range"
                className="volume-bar"
                min={0}
                max={1}
                step="any"
                value={state.volume}
                onChange={handleVolumeChange}
                orient="vertical"
              />
            )}
          </div>
          <select value={state.speed} onChange={handlePlaybackRateChange} className="speed-select">
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
