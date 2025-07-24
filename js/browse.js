const allProperties = JSON.parse(localStorage.getItem("properties")) || [];

const resultsContainer = document.getElementById("propertyResults");
const loadingMessage = document.getElementById("loadingMessage");

// Display properties with animation
function displayProperties(properties) {
  resultsContainer.innerHTML = "";

  if (properties.length === 0) {
    resultsContainer.innerHTML = "<p>No properties found.</p>";
    return;
  }

  properties.forEach((prop, index) => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${prop.image || '../img/placeholder.jpg'}" alt="Property Image" />
      <h3>${prop.title}</h3>
      <p>📍 ${prop.location}</p>
      <p>₦${prop.price} / year</p>
      <p>${prop.type}</p>
      <p>${prop.description}</p>
    `;
    resultsContainer.appendChild(card);

    // Fade-in animation
    setTimeout(() => {
      card.classList.add("show");
    }, index * 100);
  });
}

// Filter logic with loading effect
function filterProperties() {
  loadingMessage.classList.remove("hidden");
  resultsContainer.innerHTML = "";

  setTimeout(() => {
    const location = document.getElementById("searchLocation").value.toLowerCase();
    const type = document.getElementById("typeFilter").value;
    const maxPrice = parseInt(document.getElementById("maxPrice").value);

    const filtered = allProperties.filter((prop) => {
      const matchLocation = prop.location.toLowerCase().includes(location);
      const matchType = type ? prop.type === type : true;
      const matchPrice = maxPrice ? parseInt(prop.price) <= maxPrice : true;

      return matchLocation && matchType && matchPrice;
    });

    loadingMessage.classList.add("hidden");
    displayProperties(filtered);
  }, 600); // Simulated delay
}

// Cancel/reset filters and show all
function cancelSearch() {
  document.getElementById("searchLocation").value = "";
  document.getElementById("typeFilter").value = "";
  document.getElementById("maxPrice").value = "";

  loadingMessage.classList.remove("hidden");
  resultsContainer.innerHTML = "";

  setTimeout(() => {
    loadingMessage.classList.add("hidden");
    displayProperties(allProperties);
  }, 600);
}

// Initial display
displayProperties(allProperties);
