import React from 'react';

function WeatherCard({ weather }) {
  if (!weather || !weather.location || !weather.current) return null;
  const { location, current, cached } = weather;

  const getWeatherEmoji = (code) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '🌨️';
    if (code <= 82) return '🌧️';
    if (code <= 86) return '🌨️';
    if (code <= 99) return '⛈️';
    return '🌤️';
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{location.name || `${location.latitude.toFixed(2)}°, ${location.longitude.toFixed(2)}°`}</h2>
        {location.country && <p className="country">{location.country}</p>}
        <p className="coordinates">
          📍 {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
        </p>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherEmoji(current.weatherCode)}
        </div>
        <div className="temperature">
          <span className="temp-value">{Math.round(current.temperature)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="weather-description">
          {getWeatherDescription(current.weatherCode)}
        </p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{Math.round(current.apparentTemperature)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{current.windSpeed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🧭</span>
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{current.windDirection}°</span>
        </div>
      </div>

      {cached && (
        <p className="cache-info">📦 Cached data (refreshes every 5 minutes)</p>
      )}
    </div>
  );
}

export default WeatherCard;
