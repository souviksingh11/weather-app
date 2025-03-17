import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import custom CSS

const API_KEY = "0d6cd80256dfa8f0b038dbe09ea8741a"; // Replace with your OpenWeather API Key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="weather-container">
        <h1 className="title">Weather App 🌎</h1>

        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={fetchWeather}>
            Search
          </button>
        </div>

        {loading && <p className="loading">Fetching Weather...</p>}
        {error && <p className="error-message">{error}</p>}

        {weather && !loading && (
          <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h3>{weather.main.temp}°C</h3>
            <p className="description">{weather.weather[0].description}</p>

            <div className="weather-icon">
              {weather.weather[0].main === "Clear" && <WiDaySunny size={80} />}
              {weather.weather[0].main === "Clouds" && <WiCloud size={80} />}
              {weather.weather[0].main === "Rain" && <WiRain size={80} />}
              {weather.weather[0].main === "Snow" && <WiSnow size={80} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
