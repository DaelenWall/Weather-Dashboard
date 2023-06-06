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