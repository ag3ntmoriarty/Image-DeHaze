const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3001;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'local_videos/'); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const fileName = `test.mp4`;
    cb(null, fileName); // Save the file with a unique name
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/upload-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the input video file path
    const inputVideoPath = path.join(__dirname, 'local_videos', `test.mp4`);

    // Define the output video file path
    const outputVideoPath = path.join(__dirname, 'results', `result.mp4`);

    console.log('Input video path:', inputVideoPath);
    console.log('Output video path:', outputVideoPath);

    // Execute the Python script with the input and output paths
    exec(`python process_video.py ${inputVideoPath} ${outputVideoPath}`, (error, stdout, stderr) => {
      console.log('Python script output:', stdout);
      console.error('Python script error:', stderr);
      if (error) {
        console.error('Error processing video:', error);
        res.status(500).json({ error: 'An error occurred during video processing' });
      } else {
        // Handle successful video processing
        console.log('Video processed successfully');
        res.json({
          message: 'Video processed successfully',
          outputFilePath: outputVideoPath,
        });
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
