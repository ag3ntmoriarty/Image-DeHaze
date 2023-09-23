import React , {useState} from 'react';

export default function VideoUploader() {
    
    const [videoFile, setVideoFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setVideoFile(selectedFile);
    };

  return (
    <div>
      <input 
        type="file" 
        accept="video/*"
        onChange={handleFileChange} 
      />

      {videoFile && (
        <div>
            <video controls width="500" height="auto">
                <source src={URL.createObjectURL(videoFile)} type = "video/mp4" />
            </video>
        </div>
      )}
    </div>
  )
}
