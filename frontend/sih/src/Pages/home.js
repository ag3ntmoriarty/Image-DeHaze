import React, { useState } from "react";
import Header from "../Components/Header";
import Content from "../Components/Content";
import Live from "./live";
import Video from "./video";
export default function Home() {

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <Header />
      <Content setSelectedOption={setSelectedOption}/>
      {selectedOption === 'live' && <Live />}
      {selectedOption === 'video' && <Video />}

    </div>
  );
}
