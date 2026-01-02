import React, { useState } from 'react';

function SearchBox({ onSearch, onSearchByCoords }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-section">
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name (e.g., London, Tokyo, New York)"
          autoComplete="off"
        />
        <button type="submit">Get Weather</button>
      </form>
      <p className="hint">
        Or try coordinates:{' '}
        <button className="link-btn" onClick={() => onSearchByCoords(51.5074, -0.1278)}>
          London
        </button>
        ,{' '}
        <button className="link-btn" onClick={() => onSearchByCoords(40.7128, -74.0060)}>
          New York
        </button>
        ,{' '}
        <button className="link-btn" onClick={() => onSearchByCoords(35.6762, 139.6503)}>
          Tokyo
        </button>
      </p>
    </div>
  );
}

export default SearchBox;
