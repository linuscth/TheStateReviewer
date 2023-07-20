document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    const map = L.map('mapContainer').setView([37.0902, -95.7129], 3);

    // Add the base tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Handle the search form submission
    const searchForm = document.querySelector('#searchForm');
    const searchInput = document.querySelector('#searchInput');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const query = searchInput.value;


        Handlebars.registerHelper("searchValue", function () {
            return query;
        });

        // Use the Nominatim API to geocode the search query
        fetch('https://nominatim.openstreetmap.org/search?q=' + query + '&format=json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data && data.length > 0) {
                    const result = data[0];
                    const lat = parseFloat(result.lat);
                    const lon = parseFloat(result.lon);

                    // Clear existing markers from the map
                    map.eachLayer(function (layer) {
                        if (layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                    });

                    // Add a new marker to the map at the search result position
                    const marker = L.marker([lat, lon]).addTo(map);

                    // Update the map view to the search result position
                    map.setView([lat, lon], 8);


                } else {
                    console.log('No results found');
                }
            })
            .catch(function (error) {
                console.log('Error:', error);
            });
    });
});

