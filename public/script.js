let map;
let markers = [];
let locationList = document.getElementById("location-list");

// Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });
    fetchGPSData(); // Fetch initial data
}

// Fetch GPS data from the server
function fetchGPSData() {
    fetch("https://gps-tracker-g82m.onrender.com/gps")
    .then(response => response.json())
    .then(data => {
        updateMap(data);
    })
    .catch(error => console.error("Error fetching GPS data:", error));
}

// Update map with new locations
function updateMap(data) {
    markers.forEach(marker => marker.setMap(null)); // Clear previous markers
    markers = [];
    locationList.innerHTML = "";

    data.forEach((entry, index) => {
        let latLng = { lat: entry.latitude, lng: entry.longitude };
        let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: `Location ${index + 1}`
        });
        markers.push(marker);

        let listItem = document.createElement("li");
        listItem.innerText = `📍 ${entry.latitude}, ${entry.longitude}`;
        locationList.appendChild(listItem);

        if (index === data.length - 1) {
            map.setCenter(latLng); // Center map on the latest location
        }
    });
}

// Reset map & list
function resetMap() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    locationList.innerHTML = "";
}
