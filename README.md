<p align="center">
  <strong>English / فارسی (Persian)</strong>
</p>

<p align="center">
  <a href="#en">English</a> · <a href="#fa">فارسی</a>
</p>

<table>
  <tr>
    <td valign="top" width="50%">
      <a id="en"></a>
      <div markdown="1" dir="ltr">
        # Weather App

        A small, fast, multilingual weather web app built with React and Vite. The app shows current weather, hourly forecasts, a 7-day outlook, and localized UI text with many pre-provided language files.

        This README explains how to run, configure, and contribute to the project. It also clarifies how the API key is configured and how to change settings.

        **Highlights**

        - **Live data:** Fetches weather and forecast data from OpenWeatherMap.
        - **Geolocation + Search:** Use browser geolocation or search cities using OpenWeatherMap's geocoding API.
        - **Multilingual:** Includes translations in `src/locales/` and dynamic language loading via `i18next`.
        - **Responsive UI:** Built with Tailwind CSS and modern React patterns (contexts, hooks).
        - **Lightweight:** Fast development using `vite` and optimized bundle.

        --

        **Table of Contents**

        - Quick Start
        - Environment & API Key
        - How It Works
        - Features
        - Project Structure
        - Customization
        - Contributing
        - Troubleshooting
        - License & Credits

        --

        **Quick Start**

        Prerequisites: Node 18+, npm or yarn

        1. Clone the repository

        ```bash
        git clone https://github.com/Besmillah-Azimi/weather-app.git
        cd weather
        ```

        2. Install dependencies

        ```bash
        npm install
        # or: yarn
        ```

        3. Create your API key and configure environment

        Create a `.env` in the project root with your OpenWeatherMap API key:

        ```
        VITE_WEATHER_API_KEY=your_api_key_here
        ```

        Note: Vite exposes `VITE_*` environment variables under `import.meta.env`. After creating `.env`, restart the dev server.

        4. Run the app

        ```bash
        npm run dev
        ```

        Build for production:

        ```bash
        npm run build
        npm run preview # preview production build locally
        ```

        --

        **Environment Configuration & API Key**

        - The app uses OpenWeatherMap (current, forecast & geocoding) as the default data provider.
        - The source currently contains an embedded API key in `src/hooks/UseWeather.jsx`. For best security and to match Vite conventions, replace the in-file key or update that file to use `import.meta.env.VITE_WEATHER_API_KEY`.
        - Example change recommended:

        ```js
        // src/hooks/UseWeather.jsx
        const API_KEY =
          import.meta.env.VITE_WEATHER_API_KEY || "<replace-with-your-key>";
        ```

        After changing to the Vite env var, restart your dev server.

        Files with API usage:

        - [src/hooks/UseWeather.jsx](src/hooks/UseWeather.jsx)
        - [src/components/Search.jsx](src/components/Search.jsx)
        - [src/components/tabs/Overview.jsx](src/components/tabs/Overview.jsx)

        --

        **How It Works**

        - The app initializes translations in `src/i18n.js` and lazy-loads language JSON files from `src/locales/`.
        - The `LocationContext` reads browser geolocation and fallback behavior; `Search.jsx` uses OpenWeatherMap geocoding to offer suggestions.
        - The `WeatherProvider` fetches current weather and forecast from OpenWeatherMap using the `API_KEY` configured in `UseWeather.jsx`.
        - Requests are made with `axios` and default to metric units (Celsius). To change units globally, update the query params where `units=metric` is appended (see the files above).

        --

        **Features**

        - Current weather: temperature, humidity, wind, sunrise/sunset, icon and country
        - Hourly forecast: 3-hour intervals from OWM forecast
        - 7-day / overview tab: daily summaries
        - Air pollution: OpenWeatherMap air pollution endpoint data if available
        - Multilingual UI: A large set of translation files in `src/locales` and runtime language switching
        - Search suggestions: City search via geocoding API with auto-complete suggestions
        - Accessibility: Semantic HTML and keyboard-friendly controls

        --

        **Project Structure**

        - `src/` — Application source code
          - `src/hooks/` — React hooks and providers (`UseWeather`, `UseLocation`, `UseLanguage`, etc.)
          - `src/components/` — UI components and the `tabs/` views
          - `src/locales/` — Language JSON files
          - `src/i18n.js` — i18n initialization and language loading
          - `src/lib/` — Utilities
        - `public/` — Static assets and icon images
        - `package.json` — Scripts and dependencies

        --

        **Customization**

        - To change the default units (Celsius) used for weather requests, update the `units` query param in the API calls in files such as [src/hooks/UseWeather.jsx](src/hooks/UseWeather.jsx) and `src/components/tabs/*`.
        - To add or adjust translations, edit JSON files in `src/locales/` and follow existing keys.
        - To replace or remove the embedded API key, edit `src/hooks/UseWeather.jsx` and set `API_KEY` using `import.meta.env.VITE_WEATHER_API_KEY`.

        --

        **Contributing**

        - Fork the repository and create a feature branch for your changes.
        - Keep UI and translation keys consistent across languages.
        - Run linters locally using `npm run lint` before opening a PR.
        - If you'd like, format `src/hooks/UseWeather.jsx` to read env variables by default; this is recommended for security.

        --

        **Troubleshooting**

        - If the app shows data errors or requests fail:
          - Check your `.env` and ensure `VITE_WEATHER_API_KEY` is set and valid.
          - Verify that the API key has the required endpoints enabled (OpenWeatherMap sometimes requires enabling specific APIs).
        - If translations don't load, confirm `src/locales/<lang>.json` exists and matches key names used in components.

        --

        **License & Credits**

        - This repository currently doesn’t include a `LICENSE` file. If you plan to publish it, add an appropriate open-source license (e.g., MIT).
        - This project uses open-source libraries like React, Vite, Tailwind CSS, i18next, axios, framer-motion, and others — see `package.json` for full deps list.

      </div>
    </td>
    <td valign="top" width="50%">
      <a id="fa"></a>
      <div markdown="1" dir="rtl" style="text-align: right;">
        # اپلیکیشن آب‌وهوا

        یک اپلیکیشن ساده و سبک برای نمایش وضعیت آب‌وهوا، ساخته‌شده با React و Vite. این اپلیکیشن وضعیت فعلی، پیش‌بینی ساعتی و پیش‌بینی 7 روز آینده را نمایش می‌دهد و رابط کاربری چندزبانه دارد.

        این README نحوه اجرا، پیکربندی و مشارکت در پروژه را توضیح می‌دهد. همچنین نحوه تنظیم کلید API و موارد قابل سفارشی‌سازی را روشن می‌کند.

        **ویژگی‌ها**

        - **داده‌های زنده:** با OpenWeatherMap برای دریافت وضعیت و پیش‌بینی آب‌وهوا ارتباط برقرار می‌کند.
        - **موقعیت مکانی و جستجو:** از Geolocation مرورگر یا جستجوی شهرها به کمک API ژئوکدینگ استفاده می‌کند.
        - **چندزبانه:** فایل‌های ترجمه در `src/locales/` قرار دارند و با `i18next` به‌صورت پویا بارگذاری می‌شوند.
        - **واسط واکنش‌گرا:** طراحی شده با Tailwind CSS و الگوهای مدرن React (contexts و hooks).
        - **سبک و سریع:** توسعه سریع با Vite و بسته‌بندی بهینه.

        --

        **فهرست مطالب**

        - شروع سریع
        - محیط و کلید API
        - نحوه کار
        - قابلیت‌ها
        - ساختار پروژه
        - سفارشی‌سازی
        - مشارکت
        - عیب‌یابی
        - لایسنس و تقدیر

        --

        **شروع سریع**

        نیازمندی‌ها: Node 18+، npm یا yarn

        1. کلون کردن مخزن

        ```bash
        git clone https://github.com/Besmillah-Azimi/weather-app.git
        cd weather
        ```

        2. نصب وابستگی‌ها

        ```bash
        npm install
        # یا: yarn
        ```

        3. تنظیم کلید API

        یک فایل `.env` در ریشه پروژه ایجاد کنید و کلید OpenWeatherMap را قرار دهید:

        ```
        VITE_WEATHER_API_KEY=your_api_key_here
        ```

        نکته: Vite متغیرهایی که با `VITE_` شروع می‌شوند را در `import.meta.env` در دسترس قرار می‌دهد. پس از ایجاد `.env`، سرور توسعه را دوباره راه‌اندازی کنید.

        4. اجرای اپلیکیشن

        ```bash
        npm run dev
        ```

        ساخت و پیش‌نمایش برای تولید:

        ```bash
        npm run build
        npm run preview
        ```

        --

        **محیط و کلید API**

        - این پروژه به‌صورت پیش‌فرض از OpenWeatherMap برای دریافت وضعیت فعلی، پیش‌بینی و ژئوکدینگ استفاده می‌کند.
        - در حال حاضر، کلید API داخل فایل `src/hooks/UseWeather.jsx` وجود دارد. برای امنیت بهتر و همگامی با Vite پیشنهاد می‌کنیم این کلید را از متغیرهای محیطی بخوانید.
        - تغییر پیشنهادی:

        ```js
        // src/hooks/UseWeather.jsx
        const API_KEY =
          import.meta.env.VITE_WEATHER_API_KEY || "<replace-with-your-key>";
        ```

        پس از تغییر، سرور توسعه را مجدداً راه‌اندازی کنید.

        فایل‌هایی که از API استفاده می‌کنند:

        - [src/hooks/UseWeather.jsx](src/hooks/UseWeather.jsx)
        - [src/components/Search.jsx](src/components/Search.jsx)
        - [src/components/tabs/Overview.jsx](src/components/tabs/Overview.jsx)

        --

        **نحوه کار**

        - ترجمه‌ها در `src/i18n.js` مقداردهی اولیه می‌شوند و فایل‌های JSON در `src/locales/` به‌صورت lazy بارگذاری می‌گردند.
        - `LocationContext` از Geolocation مرورگر استفاده می‌کند و `Search.jsx` با API ژئوکدینگ پیشنهادهای تکمیل خودکار را ارائه می‌دهد.
        - `WeatherProvider` وضعیت فعلی و پیش‌بینی را با استفاده از `API_KEY` دریافت می‌کند.
        - درخواست‌ها با `axios` ارسال شده و واحد دما به‌صورت پیش‌فرض `metric` (سانتی‌گراد) است. برای تغییر واحدها، پارامتر `units` در URLهای درخواست را تغییر دهید.

        --

        **قابلیت‌ها**

        - وضعیت فعلی: دما، رطوبت، باد، زمان طلوع و غروب، آیکون و کشور
        - پیش‌بینی ساعتی: داده‌های سه‌ساعته از OWM
        - پیش‌بینی هفت‌روزه: خلاصه روزانه
        - آلودگی هوا: در صورت در دسترس بودن، از endpoint آلودگی هوا استفاده می‌شود
        - رابط چندزبانه: مجموعه بزرگی از فایل‌های ترجمه در `src/locales`
        - جستجو با پیشنهاد: ژئوکدینگ OpenWeatherMap برای پیشنهاد خودکار شهر
        - دسترس‌پذیری: HTML معنایی و کنترل‌های قابل استفاده با کیبورد

        --

        **ساختار پروژه**

        - `src/` — کد منبع
          - `src/hooks/` — React hooks و providerها (`UseWeather`, `UseLocation`, `UseLanguage` و ...)
          - `src/components/` — کامپوننت‌های رابط کاربری و نماهای موجود در `tabs/`
          - `src/locales/` — فایل‌های ترجمه
          - `src/i18n.js` — راه‌اندازی i18n و بارگذاری زبان‌ها
          - `src/lib/` — ابزارها و توابع کمکی
        - `public/` — دارایی‌های ایستا و آیکن‌ها
        - `package.json` — اسکریپت‌ها و وابستگی‌ها

        --

        **سفارشی‌سازی**

        - برای تغییر واحد پیش‌فرض (سانتی‌گراد)، پارامتر `units=metric` را در درخواست‌های API در فایل‌هایی مانند `src/hooks/UseWeather.jsx` و `src/components/tabs/*` تغییر دهید.
        - برای افزودن یا ویرایش ترجمه‌ها، فایل‌های JSON در `src/locales/` را به‌روزرسانی کنید.
        - برای جلوگیری از قرار گرفتن کلید در سورس، `src/hooks/UseWeather.jsx` را تغییر دهید تا از `import.meta.env.VITE_WEATHER_API_KEY` استفاده کند.

        --

        **مشارکت**

        - پروژه را فورک کنید و برای تغییرات، یک شاخه feature ایجاد کنید.
        - کلیدهای ترجمه و رفتار UI را در تمام زبان‌ها یکپارچه نگهدارید.
        - قبل از ارسال PR کد خود را با `npm run lint` بررسی کنید.

        --

        **عیب‌یابی**

        - اگر در بارگذاری داده‌ها مشکل پیش آمد:
          - `.env` را بررسی کنید که `VITE_WEATHER_API_KEY` معتبر باشد.
          - اطمینان حاصل کنید API مورد نظر در حساب OpenWeatherMap فعال است.
        - اگر ترجمه بارگذاری نشد، بررسی کنید `src/locales/<lang>.json` وجود داشته باشد و کلیدها با کد UI تطابق داشته باشند.

        --

        **لایسنس و قدردانی**

        - در مخزن فایل `LICENSE` موجود نیست. اگر می‌خواهید پروژه را منتشر کنید، یکی از لایسنس‌های رایج مانند MIT را اضافه کنید.
        - این پروژه از کتابخانه‌های متن‌باز مانند React، Vite، Tailwind CSS، i18next، axios و framer-motion استفاده می‌کند — لیست کامل وابستگی‌ها در `package.json` موجود است.

        --

      </div>
    </td>

  </tr>
</table>

---

If you prefer a single-language view, individual files are available:

- English README: [README.md](README.md)
- Persian README: [README.fa.md](README.fa.md)

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
