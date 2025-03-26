const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let locations = []; // Stores received GPS data

// Route to receive GPS data from ESP32
app.post("/send-location", (req, res) => {
    const { latitude, longitude, timestamp } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const locationData = { latitude, longitude, timestamp: timestamp || Date.now() };
    locations.push(locationData);

    console.log("Received Location:", locationData);
    res.json({ message: "Location received", location: locationData });
});

// Route to get all locations (for frontend)
app.get("/locations", (req, res) => {
    res.json(locations);
});

// Route to reset locations
app.post("/reset", (req, res) => {
    locations = [];
    res.json({ message: "All locations reset" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
