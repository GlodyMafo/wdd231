async function fetchWeather() {
    const apiKey = 'bdac7d1c99aab51b592214ea99018ce5';
    const city = 'Lubumbashi';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const weatherContainer = document.getElementById('weather-container');
     

        const weatherDiv = document.createElement("div");
        weatherDiv.classList.add("weather-card");

        weatherDiv.innerHTML = `
            <p>🌡️ Temperature : <strong>${data.main.temp}°C</strong></p>
            <p>☁️ ${data.weather[0].description}</p>
        `;

        weatherContainer.appendChild(weatherDiv);
    } catch (error) {
        document.getElementById('weather-container').innerHTML = '<p class="error">⛔ Meteo Unvalaible.</p>';
    }
}
fetchWeather();

document.addEventListener("DOMContentLoaded", fetchSpotlights);

function fetchSpotlights() {
    fetch("data/members.json") 
        .then(response => response.json())
        .then(data => {
            const spotlightContainer = document.getElementById("spotlight-container");
            spotlightContainer.innerHTML = ""; 
            
            const spotlightBusinesses = data.filter(business => business.type === "Gold" || business.type === "Sylver");

            spotlightBusinesses.forEach(business => {
                const businessDiv = document.createElement("div");
                businessDiv.classList.add("business"); 

                const img = document.createElement("img");
                img.src = `images/${business.image}`;
                img.alt = business.name;
                // img.onerror = () => img.src = "images/default.png"; 

                const infoDiv = document.createElement("div");
                infoDiv.classList.add("business-info"); 

                const name = document.createElement("h3");
                name.textContent = business.name;

                const address = document.createElement("p");
                address.textContent = `📍 ${business.address}`;

                const phone = document.createElement("p");
                phone.textContent = `📞 ${business.phone}`;

                const website = document.createElement("a");
                website.href = business.website;
                website.textContent = "🌐 Visit Web Site";
                website.target = "_blank";

                infoDiv.appendChild(name);
                infoDiv.appendChild(address);
                infoDiv.appendChild(phone);
                infoDiv.appendChild(website);

                businessDiv.appendChild(img);
                businessDiv.appendChild(infoDiv);

                spotlightContainer.appendChild(businessDiv);
            });
        })
        .catch(error => console.error("Oups ! Reload :", error));
}

async function fetchEvents() {
    try {
        const response = await fetch("data/events.json"); 
        const data = await response.json();
        const eventsContainer = document.getElementById("events-container");
    

        data.events.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event-card");

            const img = document.createElement("img");
            img.src = event.image;
            img.alt = event.title;

            const title = document.createElement("h3");
            title.textContent = event.title;

            const date = document.createElement("p");
            date.textContent = `📅 ${event.date} | 🕒 ${event.time}`;

            const location = document.createElement("p");
            location.textContent = `📍 ${event.location}`;

            const description = document.createElement("p");
            description.textContent = event.description;

            eventDiv.appendChild(img);
            eventDiv.appendChild(title);
            eventDiv.appendChild(date);
            eventDiv.appendChild(location);
            eventDiv.appendChild(description);

            eventsContainer.appendChild(eventDiv);
        });
    } catch (error) {
        console.error("Error loading events:", error);
        document.getElementById("events-container").innerHTML = "Events unavailable.";
    }
}

document.addEventListener("DOMContentLoaded", fetchEvents);
