import React, { useState, useRef } from 'react';
import axios from 'axios';
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai';
import "./Upload.css";

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleUploadIconClick = () => {
    fileInputRef.current.click();
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

      // Adding Video Processing here
      const processResponse = await axios.post('http://localhost:3001/api/process-video', {
      // Include any additional data you want to send to the server for processing
      });

      console.log('Video processing initiated:', processResponse.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
  };

  return (
    <>
      {/* <div className='uplo'>
        <input type="file" accept=".mp4" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload}>Upload Video</button>
        
        {selectedFile && (
          <div>
              <video controls width="500" height="auto">
                  <source src={URL.createObjectURL(selectedFile)} type = "video/mp4" />
              </video>
          </div>
        )}
      </div> */}
      <div className='upload-container'>
        {!selectedFile ? (
          <div className='upload-icon' onClick={handleUploadIconClick}>
            <MdCloudUpload size={48} />
            <p>Select File</p>
          </div>
        ) : null}
        <input
          type="file"
          accept=".mp4"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button type="button" onClick={handleUpload}>
          Upload Video
        </button>

        {selectedFile && (
          <div>
            <video controls width="500" height="auto">
              <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
}
