const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let gpsData = [];

app.post("/gps-data", (req, res) => {
    const { latitude, longitude } = req.body;
    if (latitude && longitude) {
        gpsData.push({ latitude, longitude, timestamp: new Date() });
        res.status(200).json({ message: "Data received" });
    } else {
        res.status(400).json({ message: "Invalid data" });
    }
});

app.get("/gps-data", (req, res) => {
    res.json(gpsData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
