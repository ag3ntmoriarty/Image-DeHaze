import './App.css';
import VideoUpload from './Components/Upload';
import Home from './Pages/home';
import Display from './Components/Display';

function App() {
  const videoSrc = '../../../backend/uploads/results/result.mp4';
  return (
    <div>
      <Home />
      <hr />
      <h1>
        Video Display
      </h1>
      <Display videoSrc={videoSrc}/>
    </div>
  );
}
export default App;