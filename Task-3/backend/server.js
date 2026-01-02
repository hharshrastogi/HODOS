require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Cache for API responses (to avoid rate limiting)
const cache = new Map();
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION) || 300000; // 5 minutes

// Helper function to get cached data
function getCachedData(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    return null;
}

// Weather API endpoint with comprehensive error handling
app.get('/api/weather', async (req, res) => {
    try {
        const { city, latitude, longitude } = req.query;

        // Input validation
        if (!city && (!latitude || !longitude)) {
            return res.status(400).json({
                success: false,
                error: 'INVALID_INPUT',
                message: 'Please provide either a city name or latitude/longitude coordinates'
            });
        }

        // Validate numeric inputs if provided
        if (latitude && (isNaN(latitude) || latitude < -90 || latitude > 90)) {
            return res.status(400).json({
                success: false,
                error: 'INVALID_LATITUDE',
                message: 'Latitude must be a number between -90 and 90'
            });
        }

        if (longitude && (isNaN(longitude) || longitude < -180 || longitude > 180)) {
            return res.status(400).json({
                success: false,
                error: 'INVALID_LONGITUDE',
                message: 'Longitude must be a number between -180 and 180'
            });
        }

        let lat, lon;

        // If city name is provided, get coordinates using geocoding
        if (city) {
            const cacheKey = `geo_${city}`;
            const cachedGeo = getCachedData(cacheKey);

            if (cachedGeo) {
                lat = cachedGeo.latitude;
                lon = cachedGeo.longitude;
            } else {
                try {
                    const geoResponse = await axios.get(
                        `https://geocoding-api.open-meteo.com/v1/search`,
                        {
                            params: { name: city, count: 1, language: 'en', format: 'json' },
                            timeout: parseInt(process.env.API_TIMEOUT) || 10000
                        }
                    );

                    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
                        return res.status(404).json({
                            success: false,
                            error: 'CITY_NOT_FOUND',
                            message: `City "${city}" not found. Please check the spelling and try again.`
                        });
                    }

                    lat = geoResponse.data.results[0].latitude;
                    lon = geoResponse.data.results[0].longitude;
                    
                    cache.set(cacheKey, { data: { latitude: lat, longitude: lon }, timestamp: Date.now() });
                } catch (error) {
                    if (error.code === 'ECONNABORTED') {
                        return res.status(408).json({
                            success: false,
                            error: 'TIMEOUT',
                            message: 'Request timeout. The geocoding service took too long to respond.'
                        });
                    }
                    throw error;
                }
            }
        } else {
            lat = parseFloat(latitude);
            lon = parseFloat(longitude);
        }

        // Check cache for weather data
        const weatherCacheKey = `weather_${lat}_${lon}`;
        const cachedWeather = getCachedData(weatherCacheKey);

        if (cachedWeather) {
            return res.json({
                success: true,
                cached: true,
                data: cachedWeather
            });
        }

        // Fetch weather data from Open-Meteo API
        const weatherResponse = await axios.get(
            'https://api.open-meteo.com/v1/forecast',
            {
                params: {
                    latitude: lat,
                    longitude: lon,
                    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
                    timezone: 'auto'
                },
                timeout: parseInt(process.env.API_TIMEOUT) || 10000
            }
        );

        const weatherData = {
            location: city || `${lat}, ${lon}`,
            latitude: lat,
            longitude: lon,
            temperature: weatherResponse.data.current.temperature_2m,
            humidity: weatherResponse.data.current.relative_humidity_2m,
            windSpeed: weatherResponse.data.current.wind_speed_10m,
            weatherCode: weatherResponse.data.current.weather_code,
            timezone: weatherResponse.data.timezone,
            timestamp: new Date().toISOString()
        };

        // Cache the result
        cache.set(weatherCacheKey, { data: weatherData, timestamp: Date.now() });

        res.json({
            success: true,
            cached: false,
            data: weatherData
        });

    } catch (error) {
        console.error('Weather API Error:', error.message);

        // Network errors
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                success: false,
                error: 'NETWORK_ERROR',
                message: 'Unable to connect to the weather service. Please check your internet connection.'
            });
        }

        // Timeout errors
        if (error.code === 'ECONNABORTED') {
            return res.status(408).json({
                success: false,
                error: 'TIMEOUT',
                message: 'Request timeout. The weather service took too long to respond.'
            });
        }

        // Rate limit or API errors
        if (error.response) {
            if (error.response.status === 429) {
                return res.status(429).json({
                    success: false,
                    error: 'RATE_LIMIT',
                    message: 'Too many requests. Please try again in a few minutes.'
                });
            }

            return res.status(error.response.status).json({
                success: false,
                error: 'API_ERROR',
                message: 'The weather service returned an error. Please try again later.'
            });
        }

        // Generic server error
        res.status(500).json({
            success: false,
            error: 'SERVER_ERROR',
            message: 'An unexpected error occurred. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Frontend: http://localhost:${PORT}`);
    console.log(`🌤️  Weather API: http://localhost:${PORT}/api/weather?city=London`);
});
