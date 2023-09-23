import React, { useState } from "react";
import Content from "../Components/Header";
import Video from "./video";
import LiveVideoFeed from "../Components/live";
import VideoUpload from "../Components/Upload";
import VideoUploader from "../Components/VideoUploader";
export default function Home() {

  const [selectedOption, setSelectedOption] = useState('video');

  return (
    <div id="container">
      <Content setSelectedOption={setSelectedOption}/>
      {selectedOption === 'live' && <LiveVideoFeed />}
      {selectedOption === 'video' && <VideoUpload />}
    </div>
  );
}
