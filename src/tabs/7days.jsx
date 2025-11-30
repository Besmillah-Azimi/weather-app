import axios from "axios";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { easeOut, motion } from "framer-motion";

import { useWeather } from "../contexts/WeatherContext";
import CountUp from "../style_components/Countup";
import TypingText from "../style_components/TypingText";
import Loader from "../style_components/Loader";
import { useTranslation } from "react-i18next";

const SevenDayWeather = () => {
  const { language } = useLanguage();
  const [daily, setDaily] = useState([]);

  const { t } = useTranslation();

  const {
    WeatherFetch,
    targetCity,
    loading,
    setLoading,
    weather,
    weatherIcons,
    API_KEY,
  } = useWeather();

  useEffect(() => {
    setLoading(true);

    const cityRes = async () => {
      await WeatherFetch()
        .then((res) => {
          setLoading(false);
          const dayRes = async () => {
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lat}&lang=${language}&appid=${API_KEY}&units=metric`
              )
              .then((day) => {
                // setDaily(day.data.list);
                // Group by date and keep one (midday) forecast per day
                const grouped = Object.values(
                  day.data.list.reduce((acc, item) => {
                    const date = item.dt_txt.split(" ")[0]; // e.g. "2025-10-08"
                    if (!acc[date]) {
                      acc[date] = item; // first one of the day
                    } else if (item.dt_txt.includes("12:00:00")) {
                      acc[date] = item; // prefer the 12:00 PM entry
                    }
                    return acc;
                  }, {})
                );

                setDaily(grouped);

                console.log("Daily Data is :", day.data.list);
              })
              .catch((er) => {
                console.log("coordinate not found!", er);
              });
          };
          dayRes();
        })
        .catch((ec) => {
          console.log("city not found!", ec);
        });
    };

    cityRes();
  }, [targetCity]);

  // Animation settings
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between cards
      },
    },
  };

  const itema = {
    hidden: { x: 1000, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0, easeOut },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">
        {!loading && (
          <TypingText
            texts={[t("daily.title")]}
            className="text-3xl font-semibold text-center mb-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-wide drop-shadow-sm"
          />
        )}
      </h2>

      {/* Loading */}
      {loading && <Loader />}

      <motion.div
        key={daily.length}
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-8 relative justify-center w-full"
      >
        {daily.map((day, index) => {
          const dayDate = new Date(day.dt_txt);

          // Normalize both to midnight for accurate comparison (ignore hours/timezone)
          const normalize = (date) =>
            new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            ).getTime();

          const today = new Date();
          const tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);

          const nDay = normalize(dayDate);
          const nToday = normalize(today);
          const nTomorrow = normalize(tomorrow);

          const locale =
            language && /^[a-z]{2}(-[A-Z]{2})?$/.test(language)
              ? language
              : "en-US"; // fallback if invalid

          let displayDay = dayDate.toLocaleDateString(locale, {
            weekday: "long",
          });

          if (nDay === nToday) {
            displayDay = t("daily.today");
          } else if (nDay === nTomorrow) {
            displayDay = t("daily.tomorrow");
          }

          return (
            <motion.div
              variants={itema}
              key={index}
              className="relative overflow-hidden min-w-60 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-500"
            >
              <div className="relative z-10 p-6 text-center flex flex-col items-center space-y-3">
                <p className="text-sm text-gray-300">
                  {new Date(day.dt_txt).toLocaleDateString(locale, {
                    day: "numeric",
                    month: "long",
                  })}
                </p>

                {weatherIcons[day.weather[0].icon] && (
                  <img
                    src={`/icons/weather/${weatherIcons[day.weather[0].icon]}`}
                    className="w-16 scale-[110%]"
                    alt="weather icon"
                  />
                )}

                <p className="text-lg font-semibold text-white tracking-wide">
                  {displayDay}
                </p>

                <p className="text-sm text-gray-400 capitalize">
                  {day.weather[0].description}
                </p>

                <div className="mt-4 flex justify-center items-center gap-3">
                  <span className="text-3xl font-bold text-white">
                    <CountUp to={Math.round(day.main.temp_max)} />°
                  </span>
                  <span className="text-gray-300">/</span>
                  <span className="text-xl text-gray-400">
                    <CountUp to={Math.round(day.main.temp_min)} />°
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SevenDayWeather;
