import React, { useState, useRef, useEffect, useContext } from "react";
import { LocationContext } from "./contexts/LocationContext";

const suggestionsList = [
  "UI Design inspirations",
  "React + Tailwind components",
  "Glassmorphism patterns",
  "Product landing UI",
  "Dark mode cards",
  "Microinteractions",
];

export default function GlassSearch() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef();

  const { setCity, targetCity } = useContext(LocationContext);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    if (value.trim()) {
      const results = suggestionsList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
      setShowSuggestions(true);
    } else {
      setFiltered([]);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setFiltered([]);
    setShowSuggestions(false);
  };

  const handleSelect = (item) => {
    setQuery(item);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-10" ref={containerRef}>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-3xl
                   bg-white/10 backdrop-blur-lg border border-white/20
                   shadow-lg hover:shadow-xl transition-all duration-200
                   focus-within:ring-2 focus-within:ring-indigo-400/40"
      >
        {/* 🔍 Search Icon */}
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

        {/* 🧠 Input */}
        <input
          type="text"
          placeholder="Search City here"
          className="flex-1 bg-transparent text-white placeholder-white/60 text-base outline-none"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity(e.target.value);
            }
          }}
          onFocus={() => query && setShowSuggestions(true)}
        />

        {/* ❌ Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Clear search"
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

      {/* 💬 Suggestions */}
      {showSuggestions && filtered.length > 0 && (
        <ul
          className="mt-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg
                     max-h-56 overflow-auto p-2 space-y-1 animate-fadeIn"
        >
          {filtered.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 rounded-lg cursor-pointer text-sm text-white hover:bg-white/15 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
