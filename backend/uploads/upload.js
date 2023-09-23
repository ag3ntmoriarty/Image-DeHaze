const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;
const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');

// Promisify the exec function for async/await usage
const execAsync = util.promisify(exec);

app.get('/run-python', async (req, res) => {
    try {
        // Python script to run
        const pythonScript = './test.py';

        // Execute the Python script asynchronously
        const { stdout, stderr } = await execAsync(`python ${pythonScript}`);

        // Process the Python script's output
        console.log(stdout);
        console.error(stderr);

        // Read and send the contents of the generated text file
        const filePath = 'myfile.txt'; // Replace with the actual path to your text file
        const fileContents = await readFileAsync(filePath, 'utf-8');

        res.json({
            message: 'Python script executed successfully',
            fileContents: fileContents,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred during script execution' });
    }
});

// Promisify the readFile function for async/await usage
const readFileAsync = util.promisify(fs.readFile);


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
