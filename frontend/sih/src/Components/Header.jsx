/*import React from 'react';
// import VideoUpload from './Upload';
// import LiveFeed from './Live';
import "./Header.css";

export default function Header() {
  return (
    <div id="header">
      <h2>PixelEncoders SIH 2023</h2>
      <p>Team #5: </p>
      <p><strong>Problem Statement:</strong> Design and development of AI-ML based intelligent de-smoking/hazing
      algorithm for reproducing the real time video of the area under fire specifically for indoor fire hazards to
      aid the rescue operation</p>



    </div>
  )
}*/

import React from 'react';
// import VideoUpload from './Upload';
// import LiveFeed from './Live';
import "./Header.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

export default function Content({ setSelectedOption }) {
  const handleSwitchChange = (event) => {
    const option = event.target.name; // Get the name attribute from the FormControlLabel
    setSelectedOption(option);
    setVidLiv(!vidliv);
  };

  const[vidliv,setVidLiv]=useState(false);


  return (
    <div id="contain">
      <div id="header">
        <h2>PixelEncoders SIH 2023</h2>
        <p>Team #5: </p>
        <p><strong>Problem Statement:</strong> Design and development of AI-ML based intelligent de-smoking/hazing
        algorithm for reproducing the real time video of the area under fire specifically for indoor fire hazards to
        aid the rescue operation</p>
      </div>
      <div id="options">
        {/* <strong>
          <h2>
            <i>Options Offered:</i>
          </h2>
        </strong> */}

        <div className="content-item">
          <div className='left'>
            <p>Video Upload</p> 
          </div>
          <div className='right'>
            <FormControlLabel
              control={<Switch defaultChecked={vidliv}  name={vidliv ? "video" : "live"} onChange={handleSwitchChange} />}
              label="Live Feed"
            />
          </div>
        </div>
        

        {/* <div className="content-item">
          <FormControlLabel
            control={<Switch defaultChecked={false} name="video" onChange={handleSwitchChange} />}
            label="Video Upload"
          />
        </div> */}

      </div>
    </div>
  );
}
