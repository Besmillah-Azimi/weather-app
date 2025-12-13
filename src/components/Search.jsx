import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useWeather } from "../hooks/UseWeather";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../hooks/UseLanguage";
import { useLocation } from "../hooks/UseLocation";

import LocationBadge from "./LocationBadge";

export default function GlassSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef();

  const { API_KEY, weather, fullCountry } = useWeather();
  const { setCity } = useLocation();

  // ⏳ Debounce timer
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchCitySuggestions(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // 🌍 Fetch from OpenWeatherMap Geocoding API (FREE)
  const fetchCitySuggestions = async (text) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: text,
            limit: 5,
            lang: "fa",
            appid: API_KEY,
          },
        }
      );

      setSuggestions(res.data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching city suggestions:", err);
    }
  };

  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // 👆 Hide list when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelect = (cityObj) => {
    const cityName = `${cityObj.name}, ${cityObj.country}`;
    setQuery(cityName);
    setCity(cityObj.name); // push to your LocationContext
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setCity("");
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-10" ref={containerRef}>
      {/* 🔍 Search Bar */}
      <div
        className=" relative flex items-center gap-3 px-4 py-3 rounded-3xl glass
                   shadow-lg hover:shadow-xl transition-all duration-200
                   focus-within:ring-2 focus-within:ring-indigo-400/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>

        <input
          type="text"
          placeholder={t("search.placeholder")}
          dir={isRTL ? "rtl" : "ltr"}
          className="flex-1 bg-transparent text-white z-40 placeholder-white/60 text-base outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(true)}
          onKeyDown={(e) => e.key === "Enter" && setCity(e.target.value)}
        />

        {query && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Clear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 📌 Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          className="mt-2 rounded-xl glass shadow-lg
                     max-h-56 overflow-auto p-2 space-y-1 animate-fadeIn"
        >
          {suggestions.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white hover:bg-white/15 transition"
            >
              {city.name}, {city.state ? `${city.state}, ` : ""}
              {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
