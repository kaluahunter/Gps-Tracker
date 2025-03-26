const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let locations = []; // Store GPS locations

// API to receive GPS data
app.post("/", (req, res) => {
  const { latitude, longitude } = req.body;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Invalid GPS data" });
  }

  locations.push({ latitude, longitude, timestamp: new Date().toLocaleTimeString() });

  console.log(`Received: Lat ${latitude}, Lng ${longitude}`);
  res.status(200).json({ message: "GPS data received" });
});

// API to send stored GPS data to frontend
app.get("/locations", (req, res) => {
  res.json(locations);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
