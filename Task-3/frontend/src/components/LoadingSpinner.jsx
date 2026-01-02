import React from 'react';

function LoadingSpinner() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
}

export default LoadingSpinner;
