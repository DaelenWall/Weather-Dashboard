const API_KEY = 'c75fa32acf7c85a549d4b30c209ae73a';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM elements
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastInfo = document.getElementById('forecast-info');
const searchHistoryList = document.getElementById('search-history-list');

// Event listener for city form submission
cityForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const cityName = cityInput.value.trim();
  if (cityName !== '') {
    getWeatherData(cityName);
    cityInput.value = '';
  }
});