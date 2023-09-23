const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;
const { exec } = require('child_process');


app.get('/run-python', (req, res) => {
    // Python script to run
    const pythonScript = './test.py';
  
    // Execute the Python script
    exec(`python ${pythonScript}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        return;
      }
      // Process the Python script's output
        console.log(stdout);
        console.log(stderr);
    });
    console.log('finished');
  });


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'local_videos/'); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
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

    // Handle the uploaded file here (e.g., validation, renaming, saving to a database)
    res.json({
      message: 'File uploaded successfully',
      filePath: req.file.path,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});