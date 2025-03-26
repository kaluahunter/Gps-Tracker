const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

let locations = [];

app.post('/gps', (req, res) => {
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
        locations.push({ latitude, longitude });
        console.log(`Received GPS Data: Lat=${latitude}, Lon=${longitude}`);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.get('/locations', (req, res) => {
    res.json(locations);
});

app.post('/reset', (req, res) => {
    locations = [];
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
