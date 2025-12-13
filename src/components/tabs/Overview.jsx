import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import axios from "axios";
import { useLanguage } from "../../hooks/UseLanguage";

import { useWeather } from "../../hooks/UseWeather";
import CountUp from "../Countup";
import Loader from "../Loader";
import { useTranslation } from "react-i18next";

const WeatherDashboard = () => {
  const { language, loading, setLoading } = useLanguage();

  const { t } = useTranslation();

  const { isRTL } = useLanguage();

  // Weather Context values
  const { targetCity, weather, API_KEY, weatherIcons, fullCountry } =
    useWeather();
  const [hourly, setHourly] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchAdditionalData = async () => {
      if (!weather) return;
      try {
        const [hourRes, airRes, forecastRes] = await Promise.all([
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&lang=${language}&units=metric&appid=${API_KEY}`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weather.coord.lat}&lon=${weather.coord.lon}&lang=${language}&appid=${API_KEY}`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&lang=${language}&units=metric&appid=${API_KEY}`
          ),
        ]);

        setHourly(hourRes.data.list);
        setAirQuality(airRes.data.list[0]);
        setForecast(forecastRes.data);
        setLoading(false);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات اضافی:", err);
        setLoading(false);
      }
    };

    fetchAdditionalData();
  }, [targetCity, weather, language]);

  // return a formatted city-local time string (safe when weather is null)
  const formatCityTime = (dt, timezone, locale = language, opts = {}) => {
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
    if (diff <= 0) return `🌙 ${t("overview.nighttime")}`;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours.toLocaleString("fa-IR")} ${t(
      "overview.hours"
    )} ${minutes.toLocaleString("fa-IR")} ${t("overview.minutes")} ${t(
      "overview.remaining"
    )}`;
  };

  const [airQuality, setAirQuality] = useState(null);
  const [forecast, setForecast] = useState(null);

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
      {loading && <Loader />}
      {weather && airQuality && !loading && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
        >
          {/* 🌆 Card 1: Current Conditions (larger spotlight card) */}

          <motion.div
            variants={items}
            dir={isRTL ? "rtl" : "ltr"}
            className="weather-widget group relative col-span-1 lg:col-span-2 backdrop-blur-2xl w-full mx-auto bg-gradient-to-br from-gray-900/10 via-teal-950/60 to-black/10 rounded-2xl p-6 shadow-xl shadow-teal-600/40 border border-teal-800/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-600/60 hover:scale-105"
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
                  {weather ? `${weather.name}, ${fullCountry}` : "-- --"}
                </p>
                <p className="text-sm text-gray-400">
                  {" "}
                  {formatCityTime(weather.dt, weather.timezone, language, {
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
                      toLocal={false}
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
                    <span className="font-bold">{t("overview.max")}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      <CountUp to={Math.round(weather.main.temp_max)} toLocal />{" "}
                      °C
                    </span>
                  </p>
                  <p className="text-sm text-white">
                    <span className="font-bold">{t("overview.min")}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      <CountUp to={Math.round(weather.main.temp_min)} toLocal />{" "}
                      °C
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
                    <span className="font-bold">
                      {t("overview.wind_speed")}:
                    </span>{" "}
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
                    <span className="font-bold">{t("overview.humidity")}:</span>{" "}
                    <span className="text-gray-300 transition-all duration-500 group-hover:text-teal-300">
                      {weather.main.humidity.toLocaleString(language)}%
                    </span>
                  </p>
                </div>
              </div>
            </>
          </motion.div>

          {/* 💨 Card 2: Quick Stats */}
          <motion.div
            variants={items}
            dir={isRTL ? "rtl" : "ltr"}
            className={`rounded-3xl p-6 shadow-2xl bg-black/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 pointer-events-none"></div>
            <div>
              <h3 className="text-lg font-semibold mb-5 text-white">
                {t("overview.quick_stats")}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between text-gray-300">
                  <span>{t("overview.humidity")}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.main.humidity} />%
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{t("overview.pressure")}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.main.pressure} /> hPa
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{t("overview.wind_speed")}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.wind.speed} duration={1} /> km/h
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{t("overview.visibility")}:</span>{" "}
                  <span className="text-white">
                    <CountUp to={weather.visibility} /> km
                  </span>
                </li>
                <li className="flex justify-between text-gray-300">
                  <span>{t("overview.clouds")}:</span>{" "}
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
            dir={isRTL ? "rtl" : "ltr"}
            className={`rounded-3xl p-6 shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
          >
            <div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/10 pointer-events-none"></div>
              <h3 className="text-lg font-semibold mb-5 text-white">
                {t("overview.sun_cycle")}
              </h3>
              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-gray-300 text-sm">
                    {t("overview.sunrise")}
                  </p>
                  <p className="font-medium text-white">
                    {weather &&
                      formatCityTime(
                        weather.sys.sunrise,
                        weather.timezone,
                        language,
                        { hour: "2-digit", minute: "2-digit", hour12: true }
                      )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">
                    {t("overview.sunset")}
                  </p>
                  <p className="font-medium text-white">
                    {" "}
                    {weather &&
                      formatCityTime(
                        weather.sys.sunset,
                        weather.timezone,
                        language,
                        { hour: "2-digit", minute: "2-digit", hour12: true }
                      )}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-2">
                  {t("overview.daylight_progress")}
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
            dir={isRTL ? "rtl" : "ltr"}
            className={`col-span-1 lg:col-span-2 text-white rounded-3xl hover:scale-[1.02] transition-transform duration-300  p-6 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20`}
          >
            <>
              <h3 className="text-lg font-semibold mb-3">
                {t("overview.next_hours")}
              </h3>
              <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-thin scrollbar-thumb-white/30">
                {hourly.slice(0, 8).map((item, index) => {
                  const time = new Date(item.dt * 1000).toLocaleTimeString(
                    language,
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
                        <CountUp to={temp} toLocal />°
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
            dir={isRTL ? "rtl" : "ltr"}
            className={`rounded-3xl p-6 shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/10 pointer-events-none"></div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              {t("overview.air_alerts")}
            </h3>
            <div className="mb-6">
              <p className="text-gray-300 text-sm">
                {t("overview.air_quality")}
              </p>

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
                {airQuality.main.aqi.toLocaleString(language)} —{" "}
                {
                  [
                    t("overview.aqi_good"),
                    t("overview.aqi_fair"),
                    t("overview.aqi_moderate"),
                    t("overview.aqi_poor"),
                    t("overview.aqi_very_poor"),
                  ][airQuality.main.aqi - 1]
                }
              </p>

              {/* AQI DESCRIPTION */}
              <p className="text-sm text-gray-300 mt-1">
                {airQuality.main.aqi === 1 && `${t("overview.aqi_1")} 🌿`}
                {airQuality.main.aqi === 2 && `${t("overview.aqi_2")} 👍`}
                {airQuality.main.aqi === 3 && `${t("overview.aqi_3")}😐`}
                {airQuality.main.aqi === 4 && `${t("overview.aqi_4")} 😷`}
                {airQuality.main.aqi === 5 && `${t("overview.aqi_1")}☠️`}
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
                {t("overview.active_alerts")}
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
                  <p className="text-green-400">{t("overview.no_alerts")}</p>
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
