const API_KEY = 'c75fa32acf7c85a549d4b30c209ae73a';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM elements
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastInfo = document.getElementById('forecast-info');
const searchHistoryList = document.getElementById('search-history-list');

// Event listener for city form submission
cityForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        getWeatherData(cityName);
        cityInput.value = '';
    }
});

// Function to fetch weather data from the API
function getWeatherData(city) {
    const apiUrl = `${API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.statusText);
            }
        })
        .then(function (data) {
            displayCurrentWeather(data);
            saveCityToLocalStorage(data.name);
        })
        .catch(function (error) {
            console.log(error);
            alert('Failed to fetch weather data. Please try again.');
        });
}

// Function to display current weather information
function displayCurrentWeather(weatherData) {
    const cityName = weatherData.name;
    const date = new Date(weatherData.dt * 1000).toLocaleDateString();
    const weatherIcon = weatherData.weather[0].icon;
    const temperature = (weatherData.main.temp) * (9 / 5) + 32;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const uvIndex = getUVIndex(weatherData.coord.lat, weatherData.coord.lon);

    const currentWeatherHtml = `
      <div>
        <h3>${cityName}</h3>
        <p>Date: ${date}</p>
        <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} °F</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>UV Index: <span id="uv-index">${uvIndex}</span></p>
      </div>
    `;

    currentWeatherInfo.innerHTML = currentWeatherHtml;
}

// Function to fetch UV index data from the API
function getUVIndex(lat, lon) {
    const apiUrl = `${API_BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    return fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.statusText);
            }
        })
        .then(function (data) {
            const uvIndex = data.value;
            const uvIndexElement = document.getElementById('uv-index');
            uvIndexElement.textContent = uvIndex;

            applyUVIndexColor(uvIndexElement, uvIndex);
        })
        .catch(function (error) {
            console.log(error);
            return 'N/A';
        });
}