import React, { useRef, useEffect, useState } from 'react';
import "./Live.css";

export default function LiveVideoFeed() {
  const [camOn, setCamOn] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    if (camOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Check if the video element exists before setting srcObject
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          mediaStreamRef.current = stream; // Save the media stream reference
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      // If camera is turned off, stop the stream (if it exists)
      const stream = mediaStreamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
        // Check if the video element exists before setting srcObject to null
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        mediaStreamRef.current = null;
      }
    }
  }, [camOn]);

  return (
    <div id="video-container">
      <button onClick={() => setCamOn(!camOn)}>
        {camOn ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
}

// Path: frontend/sih/src/Components/live.jsx
