# Weather — Modern Multi-language Weather Dashboard

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=flat&logo=netlify)](https://chimerical-marshmallow-6f8276.netlify.app/) [![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github)](https://github.com/Besmillah-Azimi/weather-app) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A beautiful, responsive, and fully localized weather dashboard built with React and Vite. It shows current conditions, hourly and daily forecasts with elegant visuals and animations. Clean UI, fast performance, and a focus on accessibility.

**Highlights:**

- ⚡ Lightweight and fast with Vite.
- 🌍 Multi-language support (i18n) — many locales preloaded.
- ✨ Tailwind CSS + animations (GSAP, Framer Motion).
- 📱 Responsive UI with immersive visuals and icons.
- 🧩 Simple, modular component structure for easy customization.

---

**Demo:** Live demo: https://chimerical-marshmallow-6f8276.netlify.app/ — Run locally (below) and open http://localhost:5173/ in your browser.

---

## Features

- Current weather conditions with sunrise/sunset detection.
- Hourly and multi-day views (overview, hourly, 7-day panels).
- Country names displayed in the selected language.
- Light/dark visuals adjusted for time-of-day and weather.
- Easy language switching via UI.

## Contact

- Open an issue at the project's GitHub repo: https://github.com/Besmillah-Azimi/weather-app/issues

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Built With](#built-with)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Localization](#localization)
- [Tips & Customization](#tips--customization)
- [Contributing](#contributing)
- [License](#license)

## Screenshot

<p align="center">
   <img src="docs/en-screenshot.PNG" alt="Weather dashboard screenshot" width="720">
</p>

## Built With

- React
- Vite
- Tailwind CSS
- i18next (react-i18next)
- Axios
- GSAP + Framer Motion
- OpenWeatherMap API

## Quick Start

1. Clone the repo

   git clone https://github.com/Besmillah-Azimi/weather-app.git
   cd weather

2. Install dependencies

   npm install

3. Configure your OpenWeatherMap API key

This project ships with a demo key in the code for convenience. For production or privacy, set your own key using an environment variable.

Create a `.env` file at the project root and add:

```sh
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

To read the key from the environment, update `src/hooks/UseWeather.jsx` to use:

```js
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

4. Run the dev server

   npm run dev

5. Build for production

   npm run build

6. Preview the build

   npm run preview

## Localization

- Languages are located in `src/locales` as separate JSON files.
- To add a language, create a new locale JSON and add its code to configuration in `src/i18n.js` and language list in `src/hooks/UseLanguage.jsx`.

## Folder Structure (key files)

- `src/App.jsx`: Top-level app and tab routing.
- `src/hooks/UseWeather.jsx`: Weather API provider (replace API key for production).
- `src/hooks/UseLanguage.jsx`: Language and i18n management.
- `src/components`: UI components and weather widgets.
- `src/locales`: JSON files for supported languages.

## Tips & Customization

- Replace `API_KEY` with a secure env variable and avoid committing keys.
- Swap or add icons located in `/public/icons/weather`.
- Extend the `WeatherReducer` to support additional weather animations or logic.

## Support

- Having trouble? Open an issue on GitHub or reach the owner via the repository contact details.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request with a clear summary and screenshots (if applicable)

## License

This project is MIT-licensed. Replace this with your preferred license.

## Credits

- Designed and implemented with a modern React toolchain and open-source libraries. Thank you to the maintainers of the libraries used here.

---

If you'd like, I can also update the code to use `VITE_OPENWEATHER_API_KEY` instead of the hard-coded key. Would you like me to do that now?
