import React, { useState } from "react";
import Header from "../Components/Header";
import Content from "../Components/Content";
import Video from "./video";
import LiveVideoFeed from "../Components/Live";
import VideoUpload from "../Components/Upload";
export default function Home() {

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div id="container">
      <Header />
      <Content setSelectedOption={setSelectedOption}/>
      {selectedOption === 'live' && <LiveVideoFeed />}
      {selectedOption === 'video' && <VideoUpload />}

    </div>
  );
}
