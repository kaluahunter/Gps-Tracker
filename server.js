const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;  // Use Render's assigned port

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

let locations = [];

// ✅ POST route for ESP32
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

// ✅ GET route for frontend to fetch locations
app.get('/locations', (req, res) => {
    res.json(locations);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
