import React, { useState, useRef } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post(`${API_URL}/api/upload-video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server (display the video URL)
      console.log('Upload success:', response.data);

      // Set the video source and play it
      if (videoRef.current && response.data.video_url) {
        videoRef.current.src = `${API_URL}${response.data.video_url}`;
        videoRef.current.play();
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <form action={`${API_URL}/upload`} method="post" encType="multipart/form-data">
        <input type="file" accept=".mp4" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>
          Upload Video
        </button>
        <video ref={videoRef} controls autoPlay></video>
      </form>
    </div>
  );
}
