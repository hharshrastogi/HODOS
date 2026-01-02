const API_BASE_URL = 'http://localhost:5002/api';

// Weather code descriptions
const weatherDescriptions = {
    0: '☀️ Clear sky',
    1: '🌤️ Mainly clear',
    2: '⛅ Partly cloudy',
    3: '☁️ Overcast',
    45: '🌫️ Foggy',
    48: '🌫️ Depositing rime fog',
    51: '🌦️ Light drizzle',
    53: '🌦️ Moderate drizzle',
    55: '🌧️ Dense drizzle',
    61: '🌧️ Slight rain',
    63: '🌧️ Moderate rain',
    65: '🌧️ Heavy rain',
    71: '🌨️ Slight snow',
    73: '🌨️ Moderate snow',
    75: '❄️ Heavy snow',
    77: '🌨️ Snow grains',
    80: '🌦️ Slight rain showers',
    81: '🌧️ Moderate rain showers',
    82: '⛈️ Violent rain showers',
    85: '🌨️ Slight snow showers',
    86: '❄️ Heavy snow showers',
    95: '⛈️ Thunderstorm',
    96: '⛈️ Thunderstorm with slight hail',
    99: '⛈️ Thunderstorm with heavy hail'
};

// Search weather by city name
async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (!city) {
        showError('EMPTY_INPUT', 'Please enter a city name');
        return;
    }

    await fetchWeather({ city });
}

// Search weather by coordinates
async function searchByCoords(lat, lon) {
    await fetchWeather({ latitude: lat, longitude: lon });
}

// Main fetch weather function
async function fetchWeather(params) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorDisplay = document.getElementById('errorDisplay');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const searchBtn = document.getElementById('searchBtn');

    // Show loading, hide others
    loadingIndicator.classList.remove('hidden');
    errorDisplay.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
    searchBtn.disabled = true;

    try {
        const queryParams = new URLSearchParams(params);
        const response = await fetch(`${API_BASE_URL}/weather?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                status: response.status,
                error: data.error,
                message: data.message
            };
        }

        displayWeather(data);

    } catch (error) {
        console.error('Error fetching weather:', error);
        
        if (error.message === 'Failed to fetch') {
            showError('NETWORK_ERROR', 'Unable to connect to the server. Please check if the backend is running on port 5002.');
        } else {
            showError(error.error || 'UNKNOWN_ERROR', error.message || 'An unexpected error occurred');
        }
    } finally {
        loadingIndicator.classList.add('hidden');
        searchBtn.disabled = false;
    }
}

// Display weather data
function displayWeather(response) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const { data, cached } = response;

    document.getElementById('locationName').textContent = data.location;
    document.getElementById('coordinates').textContent = `${data.latitude.toFixed(4)}°, ${data.longitude.toFixed(4)}°`;
    document.getElementById('tempValue').textContent = Math.round(data.temperature);
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('timezone').textContent = data.timezone;
    
    const weatherDesc = weatherDescriptions[data.weatherCode] || '🌡️ Unknown';
    document.getElementById('weatherDesc').textContent = weatherDesc;

    // Show cache indicator
    const cacheIndicator = document.getElementById('cacheIndicator');
    if (cached) {
        cacheIndicator.textContent = '📦 Cached data (less than 5 minutes old)';
        cacheIndicator.style.display = 'block';
    } else {
        cacheIndicator.style.display = 'none';
    }

    weatherDisplay.classList.remove('hidden');
}

// Show error message
function showError(errorCode, message) {
    const errorDisplay = document.getElementById('errorDisplay');
    const errorTitle = document.getElementById('errorTitle');
    const errorMessage = document.getElementById('errorMessage');

    errorTitle.textContent = formatErrorTitle(errorCode);
    errorMessage.textContent = message;
    errorDisplay.classList.remove('hidden');
}

// Dismiss error
function dismissError() {
    document.getElementById('errorDisplay').classList.add('hidden');
}

// Format error title
function formatErrorTitle(errorCode) {
    const titles = {
        'INVALID_INPUT': 'Invalid Input',
        'CITY_NOT_FOUND': 'City Not Found',
        'INVALID_LATITUDE': 'Invalid Latitude',
        'INVALID_LONGITUDE': 'Invalid Longitude',
        'NETWORK_ERROR': 'Network Error',
        'TIMEOUT': 'Request Timeout',
        'RATE_LIMIT': 'Rate Limit Exceeded',
        'API_ERROR': 'API Error',
        'SERVER_ERROR': 'Server Error',
        'EMPTY_INPUT': 'Empty Input'
    };
    return titles[errorCode] || 'Error';
}

// Test functions for error scenarios
function testInvalidCity() {
    document.getElementById('cityInput').value = 'ZzXxYyWwQq123456789';
    searchWeather();
}

function testInvalidCoords() {
    searchByCoords(999, 999);
}

function testEmptyInput() {
    document.getElementById('cityInput').value = '';
    searchWeather();
}

function testNetworkError() {
    // Try to fetch from a non-existent endpoint
    fetch('http://localhost:9999/api/weather?city=London')
        .catch(() => {
            showError('NETWORK_ERROR', 'Simulated network error: Unable to connect to server');
        });
}

// Handle Enter key in search input
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Load a default city on page load
window.addEventListener('load', () => {
    document.getElementById('cityInput').value = 'London';
    searchWeather();
});
