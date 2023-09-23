const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fileUpload = require('express-fileupload');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/backend/uploads/${file.name}`);
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });

});


app.listen(port, () => console.log(`Listening on port ${port}`));

