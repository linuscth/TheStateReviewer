document.addEventListener('DOMContentLoaded', function () {
    // Create a map instance
    var map = tt.map({
      key: 'RQK9gSqlXemCJctYGDdgBQIwQfrf1dsn',
      container: 'mapContainer',
      center: [-98.583333, 39.833333], // Default center coordinates for the US
      zoom: 5
    });
  
    // Function to add a marker to the map
    function addMarkerToMap(coordinates) {
      var marker = new tt.Marker().setLngLat(coordinates).addTo(map);
    }
  
    // Get the search form and input element
    var searchForm = document.getElementById('searchForm');
    var searchInput = document.getElementById('searchInput');
  
    // Event listener for the search form submission
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form submission
  
      var query = searchInput.value.trim(); // Get the search query
  
      // Use the TomTom Search API to geocode the query
      tt.services
        .search()
        .query(query)
        .go()
        .then(function (response) {
          var results = response.results;
  
          if (results && results.length > 0) {
            var firstResult = results[0]; // Get the first search result
            var position = firstResult.position;
  
            // Center the map on the search result coordinates
            map.setCenter(position);
  
            // Add a marker to the map at the search result coordinates
            addMarkerToMap(position);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  });
  