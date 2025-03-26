const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Allow JSON data

// Serve the homepage
app.get('/', (req, res) => {
    res.send('GPS Tracker Server is Running!');
});

// Corrected POST Route for GPS Data
app.post('/gps', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Received GPS Data: Latitude=${latitude}, Longitude=${longitude}`);
    
    res.status(200).send('GPS Data Received');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
