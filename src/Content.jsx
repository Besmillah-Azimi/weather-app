import { useState } from "react";
import "./App.css";
import axios from "axios";

function Content() {
  const API_KEY = "0394d321ae430d0c9b13209d3cde0e76";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      )
      .then((res) => {
        setWeather(res.data);
        setError("");
        console.log(res.data);
      })
      .catch((err) => {
        setError("City not found. Please try again.");
        setWeather(null);
        console.error(err);
      });
  };
  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-centerrelative overflow-auto p-6">
      {/* 🌈 Main Glassmorphism Weather Card */}
      <div className="backdrop-blur-lg bg-white/20 rounded-3xl shadow-xl p-8 w-full max-w-md text-white z-10">
        <h1 className="text-3xl font-bold text-center mb-6">🌤 Weather App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/20 border border-white/30 placeholder-white/80 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition"
          >
            Get
          </button>
        </div>

        {error && <p className="text-red-300 mb-4">{error}</p>}

        {weather && (
          <div className="bg-white/10 p-6 rounded-2xl text-center shadow-inner transition-all duration-500">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg mt-2 capitalize">
              ☁️ {weather.weather[0].description}
            </p>
            <p className="text-5xl font-bold mt-4">{weather.main.temp}°C</p>
            <div className="flex justify-between mt-6 text-sm">
              <div>
                <p className="font-semibold">💨 Wind</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
              <div>
                <p className="font-semibold">💧 Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="font-semibold">🌡 Feels</p>
                <p>{weather.main.feels_like}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🌤 Additional Glassmorphism Cards */}
      {weather && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 w-full max-w-6xl">
          {/* 🌅 Sunrise & Sunset */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-3">🌅 Sun Times</h3>
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Sunrise</p>
                <p>
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="font-semibold">Sunset</p>
                <p>
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* 🌬 Air Quality (Dummy Example) */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-3">🌬 Air Quality</h3>
            <div className="space-y-2">
              <p>PM2.5: 14 µg/m³</p>
              <p>O₃: 30 µg/m³</p>
              <p>
                AQI: <span className="font-bold text-green-300">Good</span>
              </p>
            </div>
          </div>

          {/* 🌦 Hourly Forecast (Example Static Data) */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-3">🕒 Hourly Forecast</h3>
            <div className="flex justify-between text-sm">
              {["10 AM", "1 PM", "4 PM", "7 PM"].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <p>{t}</p>
                  <p>🌤</p>
                  <p>{Math.round(weather.main.temp + i - 1)}°C</p>
                </div>
              ))}
            </div>
          </div>

          {/* 📅 7-Day Forecast (Static Example) */}
          <div className="md:col-span-2 backdrop-blur-md bg-white/10 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-4">📅 7-Day Forecast</h3>
            <div className="grid grid-cols-7 gap-3 text-center text-sm">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                <div key={i} className="p-2 bg-white/10 rounded-xl">
                  <p>{d}</p>
                  <p>🌥</p>
                  <p>{Math.round(weather.main.temp + i - 3)}°C</p>
                </div>
              ))}
            </div>
          </div>

          {/* 📊 Extra Info */}
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition-transform">
            <h3 className="text-lg font-semibold mb-3">📊 Additional Info</h3>
            <ul className="space-y-1 text-sm">
              <li>Pressure: {weather.main.pressure} hPa</li>
              <li>Visibility: {weather.visibility / 1000} km</li>
              <li>Cloudiness: {weather.clouds.all}%</li>
            </ul>
          </div>
        </div>
      )}

      {/* Floating Decorations */}
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/30 rounded-full blur-xl animate-ping"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-indigo-300/40 rounded-full blur-2xl animate-pulse"></div>
    </div>
  );
}

export default Content;
