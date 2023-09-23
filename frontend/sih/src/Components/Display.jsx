import React from 'react';

export default function Display({ videoSrc }) {
  return (
    <div>
      <video controls width="400">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
