import React from 'react';
import './App.css';

import WeatherPage from './components/WeatherPage';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">What The Weather</h1>
    </header>
    <WeatherPage />
  </div>
);

export default App;
