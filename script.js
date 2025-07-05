const apiKey = '0ab589bafe4dede7822dba2b376efdfd'; 

// Fetch weather using city name
function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Fetch weather using current location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Fetch weather from API and update DOM
function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById("weather").innerHTML = `<p>${data.message}</p>`;
        return;
      }

      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
      document.getElementById("weather").innerHTML = weatherHTML;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("weather").innerHTML = `<p>Could not fetch data.</p>`;
    });
}
