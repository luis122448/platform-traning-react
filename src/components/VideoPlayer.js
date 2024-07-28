import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = ({ url, controls = true }) => {
    const [state, setState] = useState({
        url: url,
        playing: false,
        volume: 1.0,
        speed: 1.0,
        played: 0,
        loaded: 0,
        duration: 0,
    });

    const playerRef = useRef(null);

    const handlePlayPause = () => {
        setState({ ...state, playing: !state.playing });
    };

    const handleVolumeChange = e => {
        setState({ ...state, volume: parseFloat(e.target.value) });
    };

    const handlePlaybackRateChange = e => {
        setState({ ...state, speed: parseFloat(e.target.value) });
    };

    const handleProgress = state => {
        // We only want to update time played if we are not currently seeking
        if (!state.seeking) {
            setState({ ...state, ...state });
        }
    };

    const handleDuration = duration => {
        setState({ ...state, duration });
    };

    const handleSeekChange = e => {
        setState({ ...state, played: parseFloat(e.target.value) });
    };

    const handleSeekMouseDown = e => {
        setState({ ...state, seeking: true });
    };

    const handleSeekMouseUp = e => {
        setState({ ...state, seeking: false });
        playerRef.current.seekTo(parseFloat(e.target.value));
    };

    return (
        <div className="video-wrapper">
            <ReactPlayer
                ref={playerRef}
                className="video-player"
                url={state.url}
                controls={controls}
                playing={state.playing}
                volume={state.volume}
                playbackRate={state.speed}
                onProgress={handleProgress}
                onDuration={handleDuration}
                width="100%"
                height="100%"
            />
            <div className="controls">
                <button onClick={handlePlayPause}>{state.playing ? 'Pause' : 'Play'}</button>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={state.played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={state.volume}
                    onChange={handleVolumeChange}
                />
                <select value={state.speed} onChange={handlePlaybackRateChange}>
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                </select>
            </div>
        </div>
    );
};

export default VideoPlayer;