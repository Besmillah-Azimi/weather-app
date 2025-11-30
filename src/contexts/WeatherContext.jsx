import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { useLocation } from "./LocationContext";
import { useLanguage } from "./LanguageContext";
import axios from "axios";

import {
  initialState,
  weatherReducer,
  WEATHER_ACTIONS,
} from "../reducers/WeatherReducer";

export const WeatherContext = createContext();

export default function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const API_KEY = "0394d321ae430d0c9b13209d3cde0e76";

  const { loading, setLoading, language } = useLanguage();

  const [weather, setWeather] = useState(null);

  const [targetCity, setTargetCity] = useState(null);

  const { city, location } = useLocation();

  const [fullCountry, setFullCountry] = useState("");

  useEffect(() => {
    setLoading(true);
    if (location) {
      if (city && city.trim() !== "") {
        setTargetCity(`q=${city}`);
      } else {
        setTargetCity(`lat=${location.lat}&lon=${location.lon}`);
      }
    }
  }, [city, location]);

  const weatherIcons = {
    "01d": "sunny.svg",
    "01n": "clear_night.svg", // fallback for missing clear night
    "02d": "partly_cloudy.png",
    "02n": "partly_cloudy_night.svg", // fallback
    "03d": "cloudy.png",
    "03n": "cloudy.png",
    "04d": "cloudy.png",
    "04n": "cloudy.png",
    "09d": "rain.png",
    "09n": "rain.png",
    "10d": "rain.png",
    "10n": "rain.png",
    "11d": "thunderstorms.png",
    "11n": "thunderstorms.png",
    "13d": "snow.png",
    "13n": "snow.png",
    "50d": "fog.png",
    "50n": "fog.png",
  };

  const WeatherFetch = async () => {
    if (!targetCity) return;

    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?${targetCity}&appid=${API_KEY}&units=metric&lang=${language}`
      )
      .then((res) => {
        const regionNames = new Intl.DisplayNames([language], {
          type: "region",
        });
        const fullCountryName = regionNames.of(res.data.sys?.country); // "Pakistan"
        setFullCountry(fullCountryName);
        setWeather(res.data);
        const data = res.data;
        const weatherId = data.weather[0].id;
        const currentTime = data.dt; // current UTC timestamp (seconds)
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;

        dispatch({ type: WEATHER_ACTIONS.RESET_WEATHER });

        if (weatherId >= 200 && weatherId < 300) {
          // Thunderstorm group
          dispatch({ type: WEATHER_ACTIONS.SET_LIGHTNING, payload: true });
          dispatch({ type: WEATHER_ACTIONS.SET_RAIN, payload: true });
        } else if (weatherId >= 300 && weatherId < 400) {
          // Drizzle
          setRain(true);
        } else if (weatherId >= 500 && weatherId < 600) {
          // Rain
          dispatch({ type: WEATHER_ACTIONS.SET_RAIN, payload: true });
          dispatch({ type: WEATHER_ACTIONS.SET_CLOUDS, payload: true });
        } else if (weatherId >= 600 && weatherId < 700) {
          // Snow
          dispatch({ type: WEATHER_ACTIONS.SET_SNOW, payload: true });
        } else if (weatherId >= 700 && weatherId < 800) {
          // Atmosphere (mist, smoke, haze, dust, fog)
          dispatch({ type: WEATHER_ACTIONS.SET_WIND, payload: true });
        } else if (weatherId === 800) {
          // Clear sky
          dispatch({ type: WEATHER_ACTIONS.SET_CLOUDS, payload: false });
        } else if (weatherId > 800 && weatherId < 900) {
          // Clouds
          dispatch({ type: WEATHER_ACTIONS.SET_CLOUDS, payload: true });
        }

        // 💨 Wind speed check
        if (data.wind.speed > 8)
          dispatch({ type: WEATHER_ACTIONS.SET_WIND, payload: true });

        const buffer = 30 * 60; // 30 minutes in seconds
        if (Math.abs(currentTime - sunrise) <= buffer) {
          dispatch({
            type: WEATHER_ACTIONS.SET_TIME_OF_DAY,
            payload: "sunrise",
          });
        } else if (Math.abs(currentTime - sunset) <= buffer) {
          dispatch({
            type: WEATHER_ACTIONS.SET_TIME_OF_DAY,
            payload: "sunset",
          });
        } else if (currentTime > sunrise && currentTime < sunset) {
          dispatch({ type: WEATHER_ACTIONS.SET_TIME_OF_DAY, payload: "day" });
        } else {
          dispatch({
            type: WEATHER_ACTIONS.SET_TIME_OF_DAY,
            payload: "night",
          });
        }
      });
  };

  useEffect(() => {
    WeatherFetch();
  }, [targetCity, language]);
  return (
    <WeatherContext.Provider
      value={{
        WeatherFetch,
        targetCity,
        weather,
        fullCountry,
        state,
        API_KEY,
        weatherIcons,
        setWeather,
        loading,
        setLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
