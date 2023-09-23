import React, { useRef, useEffect , useState } from 'react';

export default function LiveVideoFeed() {
  const[camOn,setCamon]=useState(false);


  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  },[]);

  return (
    <div>
        <button onClick={()=>{
            setCamon(!camOn);
        }}>Do you wish to turn your camera on?</button>
        {setCamon && <video ref={videoRef} autoPlay></video>}
    </div>
  );
}


