import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLanguage } from "../contexts/LanguageContext";
import { useWeather } from "../contexts/WeatherContext";
import TypingText from "../style_components/TypingText";
import CountUp from "../style_components/Countup";
import Loader from "../style_components/Loader";
import { useTranslation } from "react-i18next";
import LocationBadge from "../style_components/locationBadge";

const Hourly = () => {
  const {
    WeatherFetch,
    targetCity,
    weatherIcons,
    weather,
    API_KEY,
    loading,
    setLoading,
  } = useWeather();

  const { language, isRTL } = useLanguage();

  const { t } = useTranslation();

  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState("");

  // Fetch hourly forecast
  useEffect(() => {
    setLoading(true);
    if (!targetCity) return;

    const fetchHourly = async () => {
      WeatherFetch()
        .then(() => {
          const fetchH = async () => {
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${API_KEY}&lang=${language}`
              )
              .then((ros) => {
                setHourly(ros.data.list);
                setError("");
                setLoading(false);
              });
            setLoading(false);
          };

          fetchH();
        })
        .catch((err) => {
          setError("Could not fetch hourly data.");
          setLoading(false);

          console.error(err);
        });
    };
    fetchHourly();
  }, [targetCity]);

  // Format time
  const formatTime = (dt_txt) => {
    const date = new Date(dt_txt);

    const locale =
      language && /^[a-z]{2}(-[A-Z]{2})?$/.test(language) ? language : "en-US"; // fallback if invalid
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Animation settings
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // delay between cards
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-center">
      <h2
        className="text-2xl font-semibold mb-8 text-white drop-shadow"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {!loading && !error && <TypingText texts={[t("hourly.title")]} />}
      </h2>

      {/* Loading */}
      {loading && <Loader />}

      {!loading && error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && hourly.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex gap-10 flex-wrap justify-center"
        >
          {hourly.slice(0, 18).map((h, index) => {
            const icon = h.weather[0].icon;
            const desc = h.weather[0].description;
            const temp = Math.round(h.main.temp);
            const humidity = h.main.humidity;
            const time = formatTime(h.dt_txt);

            return (
              <motion.div
                key={index}
                variants={item}
                className="duration-300 font-mono text-white shadow-md shadow-blue-700/30 hover:shadow-blue-500 group cursor-pointer relative overflow-hidden bg-[#DCDFE4]/10 backdrop-blur-xl w-35 h-50 scale-[1.1] dark:bg-[#22272B]/20 rounded-3xl p-4 hover:w-56 hover:bg-blue-200/20 hover:dark:bg-[#0C66E4]/20"
              >
                <h3 className="text-xl text-center">{time}</h3>
                <div className="gap-4 relative">
                  <img
                    src={`/icons/weather/${weatherIcons[icon]}`}
                    className="w-13 my-3 ml-5 scale-[100%]"
                    alt="weather icon"
                  />{" "}
                  <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-5xl text-center group-hover:translate-x-8 group-hover:-translate-y-16 group-hover:scale-150">
                    <CountUp to={temp} toLocal />°
                  </h4>
                </div>
                <div className="absolute duration-300 -left-32 mt-2 group-hover:left-10">
                  <p className="text-sm">{desc}</p>
                  <p className="text-sm">{humidity}% humidity</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {!loading && !error && hourly.length === 0 && (
        <p className="text-gray-400 text-center">No hourly data available.</p>
      )}
    </section>
  );
};

export default Hourly;
