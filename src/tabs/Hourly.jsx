import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { LanguageContext } from "../contexts/LanguageContext";
import { TranslateContext } from "../contexts/Translate";
import { WeatherContext } from "../contexts/WeatherContext";
import TypingText from "../style_components/TypingText";
import CountUp from "../style_components/Countup";

const Hourly = () => {
  const {
    WeatherFetch,
    targetCity,
    lati,
    long,
    weatherIcons,
    weather,
    fullCountry,
    API_KEY,
  } = useContext(WeatherContext);

  const { language } = useContext(LanguageContext);

  const { translateText } = useContext(TranslateContext);

  const labels = {
    feelsLike: "Feels like",
    humidity: "Humidity",
    wind: "Wind",
    rain: "Rain",
    title: `Detailed Hourly Conditions — ${weather.name}, ${fullCountry}`,
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
  }, [language]);

  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hourly forecast
  useEffect(() => {
    if (!targetCity) return;

    const fetchHourly = async () => {
      setLoading(true);
      WeatherFetch()
        .then(() => {
          const fetchH = async () => {
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&units=metric&appid=${API_KEY}&lang=${language}`
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
  }, [targetCity, language]);

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
      <h2 className="text-2xl font-semibold mb-8 text-white drop-shadow">
        {!loading && !error && <TypingText texts={[translated.title]} />}
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
                    <CountUp to={temp} />°
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
