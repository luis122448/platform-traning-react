import './App.css';
import React from 'react';
import VideoPlayer from './components/video-player/VideoPlayer';
import VideoPlayerSample from './components/video-player-sample/VideoPlayerSample';

function App({ environment, videoUrl, previewUrl, controls = true }) {
  const renderVideoPlayer = () => {
    switch (environment) {
      case 'development':
        return <VideoPlayerSample videoUrl={videoUrl} previewUrl={previewUrl} controls={controls} />;
      case 'staging':
        return <VideoPlayerSample videoUrl={videoUrl} previewUrl={previewUrl} controls={controls} />;
      case 'production':
        return <VideoPlayer videoUrl={videoUrl} previewUrl={previewUrl} controls={controls} />;
      default:
        return <VideoPlayerSample videoUrl={videoUrl} previewUrl={previewUrl} controls={controls} />;
    }
  };

  return (
    <React.StrictMode>
      <div className="App">
        {renderVideoPlayer()}
      </div>
    </React.StrictMode>
  );
}

export default App;
