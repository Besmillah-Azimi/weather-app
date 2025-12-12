# Weather App

A lightweight, multilingual weather web app built with React and Vite. It provides current weather, hourly and 7-day forecasts, and localized text using built-in i18n files. The project is optimized for fast development with TailwindCSS and modern React patterns (contexts and hooks).

**Features**

- **Current Weather:** Displays temperature, conditions, humidity, wind, and other key metrics.
- **Hourly Forecast:** Hour-by-hour forecast for the selected location.
- **7-Day Forecast:** Daily summaries and detailed daily cards for the upcoming week.
- **Air Quality Labels:** Localized air quality descriptions and simple categorization.
- **Localization:** Full i18n support with many language JSON files in `src/locales` and runtime language detection via `i18n.js`.
- **Responsive UI:** Designed to work well on desktop and mobile screens.
- **Context-driven State:** Uses React Contexts (e.g. `WeatherContext`, `LocationContext`, `LanguageContext`) to manage global state.
- **Lightweight Animations:** Smooth transitions using `framer-motion` and `react-transition-group`.
- **Accessible Components:** Clean semantic HTML and component patterns for accessibility.

**Tech Stack**

- Framework: `React` 19
- Bundler: `Vite`
- Styling: `tailwindcss` (with `@tailwindcss/vite` helper)
- State & Localization: React Context + `i18next` + `react-i18next`
- HTTP: `axios`

**Repository Structure (important files)**

- `src/` — Application source code
  - `src/locales/` — JSON translation files for many languages
  - `src/i18n.js` — i18n initialization and language detection
  - `src/contexts/` — React Context providers (Weather, Location, Language, Tab)
  - `src/components/` — Reusable UI components
  - `src/tabs/` — Views: `Overview`, `Hourly`, `7days`, etc.
- `public/` — Static assets and icons
- `package.json` — Scripts and dependencies

**Environment / API**

This app expects a weather API key to fetch live data (OpenWeatherMap, Weatherbit, or other). Add your key in a `.env` file or your environment. For example in a `.env` placed at the project root:

```powershell
# Windows PowerShell example
$Env:VITE_WEATHER_API_KEY = 'your_api_key_here'
```

In code the app reads environment variables prefixed with `VITE_` (Vite requirement). Update `src/lib/utils.js` or the relevant fetch helpers with your chosen API endpoint if needed.

**Repository & Live Demo**

- **GitHub repository:** https://github.com/Besmillah-Azimi/weather-app.git
- **Live preview:** https://chimerical-marshmallow-6f8276.netlify.app/

**Install & Run**

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Localization**

All translations live in `src/locales/*.json`. The project already includes many language files. To add or update translations, modify the appropriate JSON file and keep translation keys consistent with the rest of the app.

**Contributing**

- Fork the repo and create a feature branch for changes.
- Keep translations and UI behavior consistent across languages.
- Run `npm run lint` before submitting pull requests.

**Troubleshooting**

- If translations don't appear, confirm the file `src/locales/<lang>.json` exists and matches expected keys.
- If API requests fail, verify your `VITE_WEATHER_API_KEY` and the API endpoint.

**License & Acknowledgements**

This project does not include a license file. Add a `LICENSE` if you plan to open-source it publicly. Many utility packages and libs used are open source — see `package.json` for versions.
