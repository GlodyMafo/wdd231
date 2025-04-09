document.addEventListener("DOMContentLoaded", () => {
    const cardGrid = document.querySelector(".card-grid");
  
    fetch("data/place.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(place => {
          const card = document.createElement("div");
          card.classList.add("card");
  
          card.innerHTML = `
            <h2>${place.name}</h2>
            <figure><img src="${place.image}" alt="${place.name} image" width="300" height="200"></figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn more</button>
          `;
  
          cardGrid.appendChild(card);
        });
      });
  
    const messageContainer = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
  
    if (!lastVisit) {
      messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const daysPassed = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysPassed < 1) {
        messageContainer.textContent = "Back so soon! Awesome!";
      } else {
        messageContainer.textContent = `You last visited ${daysPassed} day${daysPassed === 1 ? "" : "s"} ago.`;
      }
    }
  
    localStorage.setItem("lastVisit", now);
  });
  