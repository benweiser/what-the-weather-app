import React from 'react';
import logo from './logo.svg';
import './App.css';

import WeatherPage from './components/WeatherPage';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Weather App</h1>
    </header>
    <WeatherPage />
  </div>
);

export default App;
