// src/App.js
import React from 'react';
import './App.css';
import Buttons from './Buttons';
import UserLocation from './UserLocation';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <h2>By: Owen Williams</h2>
        <UserLocation />
      </header>
      <Weather />
    </div>
  );
}

export default App;
