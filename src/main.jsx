// main.jsx
import "./i18n"; // اول از همه
import { i18nReady } from "./i18n"; // این خط حیاتیه

import React from "react";
import { createRoot } from "react-dom/client";
import Providers from "./hooks/Providers.jsx";
import App from "./App";
import WeatherBackground from "./components/Bg";

// مهم: تا وقتی i18n آماده نشده، هیچی رندر نکن!
i18nReady.then(() => {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Providers>
        <App />
        <WeatherBackground />
      </Providers>
    </React.StrictMode>
  );
});
