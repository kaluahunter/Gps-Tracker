const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let locations = [];

app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    if (latitude && longitude) {
        locations.push({ latitude, longitude });
        console.log(`Received: Latitude ${latitude}, Longitude ${longitude}`);
        res.status(200).send({ message: "Location received" });
    } else {
        res.status(400).send({ error: "Invalid data" });
    }
});

app.get('/locations', (req, res) => {
    res.json(locations);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
