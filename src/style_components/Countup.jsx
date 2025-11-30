import { useLanguage } from "../contexts/LanguageContext";
import React, { useEffect, useState } from "react";

export default function CountUp({
  to = 100,
  duration = 1.5,
  delay = 0,
  className = "",
  toLocal = false,
}) {
  const [count, setCount] = useState(0);

  const { language } = useLanguage();

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let start = 0;
      const end = parseInt(to);
      if (start === end) return;

      const totalMs = duration * 1000;
      const incrementTime = 1000 / 60; // 60fps
      const increment = (end - start) / (totalMs / incrementTime);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [to, duration, delay]);

  return (
    <span className={className}>
      {count.toLocaleString(toLocal ? language : "en-US")}
    </span>
  );
}
