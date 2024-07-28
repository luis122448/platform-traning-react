import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VideoPlayer from './components/VideoPlayer';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<VideoPlayer url="https://www.youtube.com/watch?v=8qFwk-lvvXs" controls="false" />);
}

// Function to render the React player in specified container
export const renderReactComponent = (containerId, videoUrl, controls = true) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<VideoPlayer url={videoUrl} controls={controls} />);
  } else {
    console.error(`Container with id ${containerId} not found`);
  }
};

// Ensure renderReactComponent is available on window
window.renderReactComponent = renderReactComponent;

// For performance measurement
reportWebVitals();