import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player';

import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    
    <div className="App">
      <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' />
    </div>
  );
}

export default App;
