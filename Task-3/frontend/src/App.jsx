import React, { useState } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`);
      const payload = response.data || {};
      const data = payload.data || {};

      const mapped = {
        location: {
          name: typeof data.location === 'string' ? data.location : (data.location && data.location.name) || '',
          country: data.country || '',
          latitude: data.latitude,
          longitude: data.longitude
        },
        current: {
          temperature: data.temperature,
          apparentTemperature: data.apparentTemperature ?? data.temperature,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          windDirection: data.windDirection ?? 0,
          weatherCode: data.weatherCode
        },
        cached: !!payload.cached
      };

      setWeather(mapped);
    } catch (err) {
      const errorData = err.response?.data || {};
      setError({
        title: errorData.error || 'Error',
        message: errorData.message || 'An unexpected error occurred',
        code: errorData.code || 'UNKNOWN_ERROR',
        statusCode: err.response?.status || 500
      });
    } finally {
      setLoading(false);
    }
  };

  const searchByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await axios.get(`/api/weather?latitude=${lat}&longitude=${lon}`);
      const payload = response.data || {};
      const data = payload.data || {};

      const mapped = {
        location: {
          name: typeof data.location === 'string' ? data.location : (data.location && data.location.name) || '',
          country: data.country || '',
          latitude: data.latitude,
          longitude: data.longitude
        },
        current: {
          temperature: data.temperature,
          apparentTemperature: data.apparentTemperature ?? data.temperature,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          windDirection: data.windDirection ?? 0,
          weatherCode: data.weatherCode
        },
        cached: !!payload.cached
      };

      setWeather(mapped);
    } catch (err) {
      const errorData = err.response?.data || {};
      setError({
        title: errorData.error || 'Error',
        message: errorData.message || 'An unexpected error occurred',
        code: errorData.code || 'UNKNOWN_ERROR',
        statusCode: err.response?.status || 500
      });
    } finally {
      setLoading(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <header>
        <h1>🌤️ Weather Dashboard</h1>
        <p className="subtitle">Task 3: API Integration with Error Handling</p>
      </header>

      <SearchBox onSearch={searchWeather} onSearchByCoords={searchByCoords} />

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorDisplay
          title={error.title}
          message={error.message}
          code={error.code}
          onDismiss={dismissError}
        />
      )}

      {weather && <WeatherCard weather={weather} />}

      <footer>
        <p>Powered by Open-Meteo API</p>
      </footer>
    </div>
  );
}

export default App;
