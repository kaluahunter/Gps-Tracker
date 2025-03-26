const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

let gpsData = [];

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to get all GPS data
app.get("/gps", (req, res) => {
    res.json(gpsData);
});

// Endpoint to receive GPS data
app.post("/gps", (req, res) => {
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
        gpsData.push({ latitude, longitude });
        console.log("Received GPS Data:", { latitude, longitude });
        res.status(200).json({ message: "GPS data received" });
    } else {
        res.status(400).json({ error: "Invalid GPS data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
