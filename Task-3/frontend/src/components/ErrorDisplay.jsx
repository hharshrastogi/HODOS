import React from 'react';

function ErrorDisplay({ title, message, code, onDismiss }) {
  const getErrorIcon = (code) => {
    switch (code) {
      case 'NETWORK_ERROR':
        return '🌐';
      case 'TIMEOUT_ERROR':
        return '⏱️';
      case 'RATE_LIMIT_ERROR':
        return '🚫';
      case 'VALIDATION_ERROR':
        return '📝';
      case 'NOT_FOUND':
        return '🔍';
      default:
        return '⚠️';
    }
  };

  return (
    <div className="error-box">
      <div className="error-icon">{getErrorIcon(code)}</div>
      <div className="error-content">
        <h3 className="error-title">{title}</h3>
        <p className="error-message">{message}</p>
        <span className="error-code">Error Code: {code}</span>
      </div>
      <button className="dismiss-btn" onClick={onDismiss}>
        Dismiss
      </button>
    </div>
  );
}

export default ErrorDisplay;
