import React, { useState } from "react";
import Header from "../Components/Header";
import Content from "../Components/Content";
import Video from "./video";
import LiveVideoFeed from "../Components/Live";
export default function Home() {

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <Header />
      <Content setSelectedOption={setSelectedOption}/>
      {selectedOption === 'live' && <LiveVideoFeed />}
      {selectedOption === 'video' && <Video />}

    </div>
  );
}
