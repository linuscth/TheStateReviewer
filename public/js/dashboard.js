document.addEventListener('DOMContentLoaded', function () {
  // Initialize the map
  const map = L.map('mapContainer').setView([37.0902, -95.7129], 3);

  // Add the base tile layer from OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  function format_date(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  // Handle the search form submission
  const searchForm = document.querySelector('#searchForm');
  const searchInput = document.querySelector('#searchInput');
  const dashboardDiv = document.querySelector('.dashboardDiv');
  const stateTitle = document.querySelector('#stateTitle');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const query = searchInput.value;

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
          map.setView([lat, lon], 6);

          // Update the state title
          stateTitle.textContent = query;

          // Fetch reviews for the selected state
          fetch('/api/reviews/state/' + encodeURIComponent(query))
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              if (data && data.length > 0) {
                // Clear existing reviews
                dashboardDiv.innerHTML = '';

                // add a button that will lead user to add review
                const addReviewDiv = document.createElement('div');
                addReviewDiv.className = 'd-grid gap-2 addReviewDiv'
                const addReviewBtn = document.createElement('a');
                addReviewBtn.className = 'btn btn-primary m-3';
                addReviewBtn.href = `/addreview/${data[0].state.id}`;
                addReviewBtn.setAttribute('role', 'button');
                addReviewBtn.innerText = 'Add A Review';
                addReviewDiv.append(addReviewBtn);
                dashboardDiv.append(addReviewDiv);


                // Render the reviews
                data.forEach(function (review) {
                  const reviewCard = document.createElement('div');
                  reviewCard.classList.add('reviewCard', 'card', 'p-3');
                  reviewCard.dataset.state = review.State ? review.State.name : 'Unknown'; // Access the state name

                  const cardHeader = document.createElement('div');
                  cardHeader.classList.add('card-header', 'p-3', 'd-flex', 'justify-content-between', 'align-items-center', 'p-3', 'mb-2', 'bg-success-subtle', 'text-emphasis-success');
                  const h4 = document.createElement('h4');
                  h4.textContent = review.review_topic;
                  const username = document.createElement('p');
                  username.textContent = 'posted by ' + (review.user ? review.user.username : 'Unknown'); // Access the username
                  cardHeader.appendChild(h4);
                  cardHeader.appendChild(username);

                  const cardBody = document.createElement('div');
                  cardBody.classList.add('card-body', 'border', 'border-2', 'rounded-bottom');
                  const reviewDetails = document.createElement('p');
                  reviewDetails.classList.add('text-body-secondary');
                  reviewDetails.textContent = review.review_details;
                  const createdAt = document.createElement('p');
                  createdAt.textContent = 'on ' + format_date(review.createdAt);
                  cardBody.appendChild(reviewDetails);
                  cardBody.appendChild(createdAt);

                  reviewCard.appendChild(cardHeader);
                  reviewCard.appendChild(cardBody);

                  dashboardDiv.appendChild(reviewCard);
                });
              } else {
                // Clear existing reviews
                dashboardDiv.innerHTML = '';

                // Display "No results found" message
                const noResults = document.createElement('p');
                noResults.textContent = 'No results found';
                dashboardDiv.appendChild(noResults);
              }
            })
            .catch(function (error) {
              console.log('Error:', error);
            });
        } else {
          console.log('No results found');
        }
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  });
});
