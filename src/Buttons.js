import React from 'react';

function Buttons({ location, onLocationChange, onFetchWeather }) {
  return (
    <div className="weather-controls">
      <input
        type="text"
        value={location}
        onChange={onLocationChange}
        placeholder="Enter location"
      />
      <button onClick={onFetchWeather}>Check Weather</button>
    </div>
  );
}

export default Buttons;
