const express = require('express');
const port = 3000;

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
    }
);