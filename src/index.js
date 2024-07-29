import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const renderReactComponent = (environment, containerId, videoUrl, previewUrl, controls) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App environment={environment} videoUrl={videoUrl} previewUrl={previewUrl} controls={controls} />);
  } else {
    console.error(`Container with id ${containerId} not found`);
  }
};

window.renderReactComponent = renderReactComponent;

reportWebVitals();