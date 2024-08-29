import React, { useState } from 'react';
import './App.css';
import { getLat, getLng } from './UserLocation';
import Buttons from './Buttons';

function Weather() {
  const apiKey = '29c070f37da04a169bd15744242908';
  const days = 3; // Number of days of forecast you want

  // Initialize the location based on latitude and longitude or default to the location from getLocation
  let initialLocation = getLat() +","+ getLng();

  // State to manage location, weather data, and errors
  const [location, setLocation] = useState(initialLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch weather data
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message || 'Error fetching weather data');
      }
    } catch (error) {
      setError('An error occurred while fetching the weather data.');
      console.error('Error fetching weather data:', error);
    }
  };

  // Function to handle location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="App">
      <div className="weather-controls-container">
        <Buttons
          location={location}
          onLocationChange={handleLocationChange}
          onFetchWeather={fetchWeather}
        />
        <h2 className="weather-heading">Upcoming Weather in {location}:</h2>
      </div>

      <div className="weather-container">
        {error && <p className="error">Error: {error}</p>}

        {weatherData && (
          <div id="weather-info" className="weather-info">
            {weatherData.forecast.forecastday.map((forecast, index) => {
              const date = new Date(forecast.date);
              return (
                <div key={index} className="forecast">
                  <p>
                    <strong>Date:</strong> {date.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Max Temperature:</strong> {forecast.day.maxtemp_f} °F
                  </p>
                  <p>
                    <strong>Min Temperature:</strong> {forecast.day.mintemp_f} °F
                  </p>
                  <p>
                    <strong>Weather:</strong> {forecast.day.condition.text}
                  </p>
                  <p>
                    <strong>Wind Speed:</strong> {forecast.day.maxwind_mph} mph
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
