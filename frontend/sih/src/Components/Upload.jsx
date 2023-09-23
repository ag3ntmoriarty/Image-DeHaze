import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
  
    console.log('Selected file:', selectedFile); // Log the selected file
  
    const formData = new FormData();
    formData.append('video', selectedFile);
  
    try {
      const response = await axios.post('http://localhost:3001/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  

  return (
    <div>
      <input type="file" accept=".mp4" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload Video</button>
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
