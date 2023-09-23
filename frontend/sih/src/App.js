import './App.css';
import VideoUpload from './Components/Upload';
import Home from './Pages/home';
import Display from './Components/Display';
import { useState } from 'react';

function App() {
  const [videoSrc, setVideoSrc] = useState('');

  // Fetch the URL of the processed video from your Express.js backend
  // and set it as the 'videoSrc' state variable
  const getVideoSrc = async () => {
    try {
      const response = await fetch('http://localhost:3001/results/result.mp4');
      const data = await response.json();
      console.log('Video src:', data.outputFilePath);
      setVideoSrc(data.outputFilePath);
    } catch (error) {
      console.error('Error fetching video source:', error);
    }
  };

  return (
    <div>
      <Home />
      {/* <VideoUpload getVideoSrc={getVideoSrc} /> Pass the 'getVideoSrc' function to the VideoUpload component */}
      <Display 
      videoSrc="http://localhost:3001/results/result.mp4"
      />
    </div>
  );
}

export default App;