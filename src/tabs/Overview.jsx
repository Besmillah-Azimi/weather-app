import React, { useContext, useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";

import axios from "axios";
import { LanguageContext } from "../contexts/LanguageContext";
import { TranslateContext } from "../contexts/Translate";

import { WeatherContext } from "../contexts/WeatherContext";
import CountUp from "../style_components/Countup";
import { scale } from "framer-motion";
import { p } from "framer-motion/client";

const WeatherDashboard = () => {
  const { language } = useContext(LanguageContext);

  // Weather Context values
  const {
    WeatherFetch,
    targetCity,
    weather,
    API_KEY,
    lati,
    long,
    setWeather,
    weatherIcons,
  } = useContext(WeatherContext);

  // const [targetCity, setTargetCity] = useState(null);

  const [loading, setLoading] = useState(null);

  // const targetCity = city.trim() !== "" ? city : location;

  // const [weather, setWeather] = useState(null);

  const [hourly, setHourly] = useState([]);

  const [error, setError] = useState("");

  // ✅ Fetch weather data whenever `targetCity` changes
  useEffect(() => {
    if (!targetCity) return;

    const fetchWeather = async () => {
      setLoading(true);

      WeatherFetch()
        .then((res) => {
          const fetchHourly = async () => {
            setLoading(true);
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&units=metric&appid=${API_KEY}`
              )
              .then((hour) => {
                setLoading(false);

                setHourly(hour.data.list);
                console.log("Hour data :", hour.data.list);
              })
              .catch((error) => {
                setLoading(false);
                setError("Hourly Not Found !", error);
              });
          };

          // Air Quality API
          const resAir = async () => {
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lati}&lon=${long}&appid=${API_KEY}`
              )
              .then((qualit) => {
                setAirQuality(qualit.data.list[0]);
              })
              .catch((qua) => {
                setError(qua);
              });
          };

          resAir();

          // Forecast API (for alerts)
          const resForecast = async () => {
            setLoading(true);
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${API_KEY}&units=metric`
              )
              .then((alert) => {
                setForecast(alert.data);
                setLoading(false);
              })
              .catch((alerrr) => {
                setError(alerrr);
                setLoading(false);
              });
          };

          resForecast();

          fetchHourly();

          console.log("Weather data fetched successfully");
          setLoading(false);
        })
        .catch((err) => {
          setError("City not found. Please try again.");
          setWeather(null);
          console.error(err);
        });
    };

    fetchWeather();
  }, [targetCity, language, lati, long]);

  // return a formatted city-local time string (safe when weather is null)
  const formatCityTime = (dt, timezone, locale = "en-US", opts = {}) => {
    if (dt == null || timezone == null) return "";
    // city timestamp in ms
    const cityMs = (dt + timezone) * 1000;
    const date = new Date(cityMs);
    // Format using UTC so it's not shifted by the user's browser TZ
    return date.toLocaleString(locale, { timeZone: "UTC", ...opts });
  };

  // For daylight Progress
  const getDaylightProgress = (sunrise, sunset, dt) => {
    if (!sunrise || !sunset || !dt) return 0;
    const progress = ((dt - sunrise) / (sunset - sunrise)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  // For hours remaining
  const getHoursRemaining = (sunset, dt) => {
    const diff = (sunset - dt) * 1000;
    if (diff <= 0) return "🌙 Nighttime";
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m remaining`;
  };

  const [airQuality, setAirQuality] = useState(null);
  const [forecast, setForecast] = useState(null);

  const { translateText } = useContext(TranslateContext);

  // Labels for translation
  const labels = {
    humidity: "Humidity",
    wind_speed: "Wind",
    Feels_like: "Feels like",
    rain: "Rain",
    Max: "High",
    Min: "Low",
    pressure: "Pressure",
    visibility: "Visibility",
    clouds: "Cloud cover",
    Quick_Stats: "Quick Stats",
    Sun_Cycle: "Sun Cycle",
    sunrise: "Sunrise",
    sunset: "Sunset",
    Daylight_Progress: "Daylight Progress",
    Next_hours: "Next Hours",
    Air_Alerts: "Air & Alerts",
    Air_Quality: "Air Quality",
    Active_Alerts: "Active Alerts",
    no_alerts: "No active alerts",
  };

  const [translated, setTranslated] = useState(labels);

  // Translate labels when language changes
  useEffect(() => {
    const translateAll = async () => {
      const newLabels = {};
      for (const key in labels) {
        newLabels[key] = await translateText(labels[key]);
      }
      setTranslated(newLabels);
    };
    translateAll();
  }, [language]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.4 } },
  };

  const items = {
    hidden: { opacity: 0, rotateX: 150 },
    visible: { opacity: 1, transition: { duration: 0.5 }, rotateX: 360 },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {loading && (
        <div class="loader">
          <svg
            id="cloud"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="roundness">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="1.5"
                ></feGaussianBlur>
                <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"></feColorMatrix>
              </filter>
              <mask id="shapes">
                <g fill="white">
                  <polygon points="50 37.5 80 75 20 75 50 37.5"></polygon>
                  <circle cx="20" cy="60" r="15"></circle>
                  <circle cx="80" cy="60" r="15"></circle>
                  <g>
                    <circle cx="20" cy="60" r="15"></circle>
                    <circle cx="20" cy="60" r="15"></circle>
                    <circle cx="20" cy="60" r="15"></circle>
                  </g>
                </g>
              </mask>
              <mask id="clipping" clipPathUnits="userSpaceOnUse">
                <g id="lines" filter="url(#roundness)">
                  <g mask="url(#shapes)" stroke="white">
                    <line x1="-50" y1="-40" x2="150" y2="-40"></line>
                    <line x1="-50" y1="-31" x2="150" y2="-31"></line>
                    <line x1="-50" y1="-22" x2="150" y2="-22"></line>
                    <line x1="-50" y1="-13" x2="150" y2="-13"></line>
                    <line x1="-50" y1="-4" x2="150" y2="-4"></line>
                    <line x1="-50" y1="5" x2="150" y2="5"></line>
                    <line x1="-50" y1="14" x2="150" y2="14"></line>
                    <line x1="-50" y1="23" x2="150" y2="23"></line>
                    <line x1="-50" y1="32" x2="150" y2="32"></line>
                    <line x1="-50" y1="41" x2="150" y2="41"></line>
                    <line x1="-50" y1="50" x2="150" y2="50"></line>
                    <line x1="-50" y1="59" x2="150" y2="59"></line>
                    <line x1="-50" y1="68" x2="150" y2="68"></line>
                    <line x1="-50" y1="77" x2="150" y2="77"></line>
                    <line x1="-50" y1="86" x2="150" y2="86"></line>
                    <line x1="-50" y1="95" x2="150" y2="95"></line>
                    <line x1="-50" y1="104" x2="150" y2="104"></line>
                    <line x1="-50" y1="113" x2="150" y2="113"></line>
                    <line x1="-50" y1="122" x2="150" y2="122"></line>
                    <line x1="-50" y1="131" x2="150" y2="131"></line>
                    <line x1="-50" y1="140" x2="150" y2="140"></line>
                  </g>
                </g>
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              rx="0"
              ry="0"
              mask="url(#clipping)"
            ></rect>
            <g>
              <path d="M33.52,68.12 C35.02,62.8 39.03,58.52 44.24,56.69 C49.26,54.93 54.68,55.61 59.04,58.4 C59.04,58.4 56.24,60.53 56.24,60.53 C55.45,61.13 55.68,62.37 56.63,62.64 C56.63,62.64 67.21,65.66 67.21,65.66 C67.98,65.88 68.75,65.3 68.74,64.5 C68.74,64.5 68.68,53.5 68.68,53.5 C68.67,52.51 67.54,51.95 66.75,52.55 C66.75,52.55 64.04,54.61 64.04,54.61 C57.88,49.79 49.73,48.4 42.25,51.03 C35.2,53.51 29.78,59.29 27.74,66.49 C27.29,68.08 28.22,69.74 29.81,70.19 C30.09,70.27 30.36,70.31 30.63,70.31 C31.94,70.31 33.14,69.44 33.52,68.12Z"></path>
              <path d="M69.95,74.85 C68.35,74.4 66.7,75.32 66.25,76.92 C64.74,82.24 60.73,86.51 55.52,88.35 C50.51,90.11 45.09,89.43 40.73,86.63 C40.73,86.63 43.53,84.51 43.53,84.51 C44.31,83.91 44.08,82.67 43.13,82.4 C43.13,82.4 32.55,79.38 32.55,79.38 C31.78,79.16 31.02,79.74 31.02,80.54 C31.02,80.54 31.09,91.54 31.09,91.54 C31.09,92.53 32.22,93.09 33.01,92.49 C33.01,92.49 35.72,90.43 35.72,90.43 C39.81,93.63 44.77,95.32 49.84,95.32 C52.41,95.32 55,94.89 57.51,94.01 C64.56,91.53 69.99,85.75 72.02,78.55 C72.47,76.95 71.54,75.3 69.95,74.85Z"></path>
            </g>
          </svg>
        </div>
      )}
      {weather && airQuality && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
        >
          {/* 🌆 Card 1: Current Conditions (larger spotlight card) */}

          <motion.div
            variants={items}
            className="weather-widget group relative col-span-1 lg:col-span-2 backdrop-blur-1xl  bg-gradient-to-br from-gray-900/10 via-teal-950/10 to-black/10 rounded-2xl p-6 shadow-md shadow-teal-600/40 border border-teal-800/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-teal-600/60 hover:scale-105"
          >
            {/* Background glow effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div
                className="absolute w-3 h-3 bg-cyan-400 rounded-full blur-md transition-all duration-500 group-hover:scale-150"
                style={{ left: "15%", top: "20%" }}
              ></div>
              <div
                className="absolute w-4 h-4 bg-teal-300 rounded-full blur-lg transition-all duration-500 group-hover:scale-125"
                style={{ right: "25%", bottom: "15%" }}
              ></div>
              <div
                className="absolute w-2 h-2 bg-yellow-400 rounded-full blur transition-all duration-500 group-hover:scale-175"
                style={{ left: "40%", top: "10%" }}
              ></div>
            </div>
            {/* Border animation */}
            <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-500 group-hover:border-teal-500/40">
              <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent transition-all duration-500 group-hover:w-full"></div>
            </div>
            <>
              {/* Location + Date */}
              <div className="text-center mb-4 relative z-10">
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-500 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
                  {weather
                    ? `${weather.name}, ${weather.sys.country}`
                    : "-- --"}
                </p>
                <p className="text-sm text-gray-400">
                  {" "}
                  {formatCityTime(weather.dt, weather.timezone, "en-US", {
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              {/* Icon + Temperature */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <img
                  src={`/icons/weather/${
                    weatherIcons[weather.weather[0].icon]
                    // weatherIcons["03d"]
                  }`}
                  className="w-16 h-16"
                  alt="weather icon"
                />
                <div className="text-right">
                  <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 group-hover:from-yellow-500 group-hover:to-orange-600 group-hover:text-5xl group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                    <CountUp
                      delay={1}
                      to={Math.round(weather.main.temp)}
                      duration={1.5}
                    />
                    °C
                  </p>
                  <p className="text-sm text-gray-300">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>

              {/* Extra info */}
              <div className="grid grid-cols-2 gap-4 bg-teal-900/20 rounded-lg p-4 backdrop-blur-sm border border-teal-700/40 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 opacity-0 transition-all duration-500 group-hover:opacity-50 rounded-lg"></div>

                <div className="flex flex-col items-start relative z-10">
                  <p className="text-sm text-white">
                    <span className="font-bold">{translated.Max}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      <CountUp to={Math.round(weather.main.temp_max)} /> °C
                    </span>
                  </p>
                  <p className="text-sm text-white">
                    <span className="font-bold">{translated.Min}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      <CountUp to={Math.round(weather.main.temp_min)} /> °C
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-start relative z-10">
                  <p className="text-sm text-white flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-teal-300 transition-all duration-500 group-hover:text-teal-400 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 0 1 1.789 2.894l-3.5 7A2 2 0 0 1 15.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 0 0-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 0 1-.608 2.006L7 10m7-7V3m-7 7h10"
                      ></path>
                    </svg>
                    <span className="font-bold">{translated.wind_speed}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      {weather.wind.speed} km/h
                    </span>
                  </p>

                  <p className="text-sm text-white flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-teal-300 transition-all duration-500 group-hover:text-teal-400 group-hover:rotate-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v10m-4-4h8"
                      ></path>
                    </svg>
                    <span className="font-bold">{translated.humidity}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      {weather.main.humidity}%
                    </span>
                  </p>
                </div>
              </div>
            </>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
              </div>
            )}
          </motion.div>

          {/* 💨 Card 2: Quick Stats */}
          <motion.div
            variants={items}
            className={`rounded-3xl p-6 shadow-2xl bg-black/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 pointer-events-none"></div>
            <div>
              <h3 className="text-lg font-semibold mb-5 text-white">
                {translated.Quick_Stats}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between text-gray-300">
                  <span>{translated.humidity}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.main.humidity} />%
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{translated.pressure}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.main.pressure} /> hPa
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{translated.wind_speed}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.wind.speed} duration={1} /> km/h
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{translated.visibility}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.visibility} /> km
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{translated.clouds}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.clouds.all} />%
                  </span>
                </li>
              </ul>
            </div>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                {/* <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div> */}
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
              </div>
            )}
          </motion.div>

          {/* 🌅 Card 3: Sun Cycle */}
          <motion.div
            variants={items}
            className={`rounded-3xl p-6 shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
          >
            <div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/10 pointer-events-none"></div>
              <h3 className="text-lg font-semibold mb-5 text-white">
                {translated.Sun_Cycle}
              </h3>
              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-gray-300 text-sm">{translated.sunrise}</p>
                  <p className="font-medium text-white">
                    {weather &&
                      formatCityTime(
                        weather.sys.sunrise,
                        weather.timezone,
                        "en-US",
                        { hour: "2-digit", minute: "2-digit", hour12: true }
                      )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{translated.sunset}</p>
                  <p className="font-medium text-white">
                    {" "}
                    {weather &&
                      formatCityTime(
                        weather.sys.sunset,
                        weather.timezone,
                        "en-US",
                        { hour: "2-digit", minute: "2-digit", hour12: true }
                      )}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-2">
                  {translated.Daylight_Progress}
                </p>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                    style={{
                      width: `${getDaylightProgress(
                        weather.sys.sunrise,
                        weather.sys.sunset,
                        weather.dt
                      ).toFixed(1)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  {" "}
                  {getHoursRemaining(weather.sys.sunset, weather.dt)}
                </p>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                {/* <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div> */}
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
              </div>
            )}
          </motion.div>

          {/* 🌤️ Next Hours Forecast */}
          <motion.div
            variants={items}
            className={`col-span-1 lg:col-span-2 rounded-3xl hover:scale-[1.02] transition-transform duration-300  p-6 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20`}
          >
            <>
              <h3 className="text-lg font-semibold mb-3">
                {translated.Next_hours}
              </h3>
              <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-thin scrollbar-thumb-white/30">
                {hourly.slice(0, 8).map((item, index) => {
                  const time = new Date(item.dt * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  );
                  const temp = Math.round(item.main.temp);
                  const icon = item.weather[0].icon;

                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 bg-white/10 p-4 rounded-xl text-center w-24 backdrop-blur-md"
                    >
                      <img
                        src={`/icons/weather/${weatherIcons[icon]}`}
                        alt="icon"
                        className="w-8 mx-auto"
                      />
                      <p className="text-sm mt-1">{time}</p>
                      <p className="text-lg font-medium">
                        <CountUp to={temp} />°
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
              </div>
            )}
          </motion.div>

          {/* ☁️ Card 5: Air & Alerts */}
          <motion.div
            variants={items}
            className={`rounded-3xl p-6 shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/10 pointer-events-none"></div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              {translated.Air_Alerts}
            </h3>
            <div className="mb-6">
              <p className="text-gray-300 text-sm">{translated.airQuality}</p>

              {/* AQI VALUE + LABEL */}
              <p
                className={`text-2xl font-semibold mt-1 ${
                  airQuality.main.aqi === 1
                    ? "text-green-400"
                    : airQuality.main.aqi === 2
                    ? "text-lime-400"
                    : airQuality.main.aqi === 3
                    ? "text-yellow-400"
                    : airQuality.main.aqi === 4
                    ? "text-orange-400"
                    : "text-red-500"
                }`}
              >
                {airQuality.main.aqi} —{" "}
                {
                  ["Good", "Fair", "Moderate", "Poor", "Very Poor"][
                    airQuality.main.aqi - 1
                  ]
                }
              </p>

              {/* AQI DESCRIPTION */}
              <p className="text-sm text-gray-300 mt-1">
                {airQuality.main.aqi === 1 && "Air quality is excellent 🌿"}
                {airQuality.main.aqi === 2 && "Air quality is acceptable 👍"}
                {airQuality.main.aqi === 3 &&
                  "Moderate air — sensitive groups may feel effects 😐"}
                {airQuality.main.aqi === 4 &&
                  "Poor air — reduce outdoor activities 😷"}
                {airQuality.main.aqi === 5 &&
                  "Very poor — avoid staying outside ☠️"}
              </p>
            </div>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
                <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
                {/* <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div> */}
              </div>
            )}
            {/* Divider */}
            <div className="border-t border-white/10 my-4"></div>
            {/* ===== WEATHER ALERTS ===== */}
            <div>
              <p className="text-gray-300 text-sm">
                {translated.Active_Alerts}
              </p>
              <div className="mt-2 text-sm">
                {forecast && forecast.alerts && forecast.alerts.length > 0 ? (
                  forecast.alerts.map((alert, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-red-400 font-semibold">
                        ⚠️ {alert.event}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {alert.sender_name} — {alert.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-green-400">{translated.no_alerts}</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default WeatherDashboard;
