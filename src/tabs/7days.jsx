import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { easeOut, motion } from "framer-motion";

import { WeatherContext } from "../contexts/WeatherContext";
import CountUp from "../style_components/Countup";
import TypingText from "../style_components/TypingText";
import { TranslateContext } from "../contexts/Translate";

const SevenDayWeather = () => {
  const { language } = useContext(LanguageContext);
  const [daily, setDaily] = useState([]);

  const {
    WeatherFetch,
    targetCity,
    lati,
    long,
    weatherIcons,
    fullCountry,
    weather,
    API_KEY,
  } = useContext(WeatherContext);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cityRes = async () => {
      setLoading(true);
      await WeatherFetch()
        .then((res) => {
          setLoading(false);
          const dayRes = async () => {
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&lang=${language}&appid=${API_KEY}&units=metric`
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
  }, [targetCity, language]);

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

  const { translateText } = useContext(TranslateContext);

  const labels = {
    title: `Forecast Weather in ${weather.name} , ${fullCountry} (Next 6 Days)`,
  };

  const [translated, setTranslated] = useState(labels);

  useEffect(() => {
    const translateAll = async () => {
      const newLabels = {};
      for (const key in labels) {
        newLabels[key] = await translateText(labels[key]);
      }
      setTranslated(newLabels);
    };
    translateAll();
    console.log("rendered");
  }, [language]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-white">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-tight">
        {!loading && (
          <TypingText
            texts={[translated.title]}
            className="text-3xl font-semibold text-center mb-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tracking-wide drop-shadow-sm"
          />
        )}
      </h2>

      {/* Loading */}
      {loading && (
        <div className="loader w-full flex justify-center items-center ">
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

          let displayDay = dayDate.toLocaleDateString(language, {
            weekday: "long",
          });

          if (nDay === nToday) {
            displayDay = "Today";
          } else if (nDay === nTomorrow) {
            displayDay = "Tomorrow";
          }

          return (
            <motion.div
              variants={itema}
              key={index}
              className="relative overflow-hidden min-w-60 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-500"
            >
              <div className="relative z-10 p-6 text-center flex flex-col items-center space-y-3">
                <p className="text-sm text-gray-300">
                  {new Date(day.dt_txt).toLocaleDateString(language, {
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
