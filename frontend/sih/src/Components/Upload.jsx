import React, { useState } from 'react';
import axios from 'axios';

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from the server (e.g., display a success message)
      console.log('Upload success:', response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".mp4" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}
