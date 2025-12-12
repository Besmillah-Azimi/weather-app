import Sidebar from "./Sidebar";
import WeatherDashboard from "./tabs/Overview";
import { useTab } from "./contexts/TabContext";
import GlassSearch from "./Search";
import Hourly from "./tabs/Hourly";
import SevenDayWeather from "./tabs/7days";
import Dock from "./style_components/Taskbar";
import LocationBadge from "./style_components/LocationBadge";

import LanguageModal from "./style_components/LanguageModal";

import "./App.css";

import { useLanguage } from "./contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import { useWeather } from "./contexts/WeatherContext";

const icons = {
  menu: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  overview: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13h8V3H3v10zM13 21h8v-8h-8v8zM13 3v6h8V3h-8zM3 21h8v-4H3v4z"
      />
    </svg>
  ),
  calendar: (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 001-1V7a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
      />
    </svg>
  ),
  hourly: (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4l3 3M3.223 14C4.132 18.008 7.717 21 12 21c4.971 0 9-4.029 9-9s-4.029-9-9-9c-3.729 0-6.929 2.268-8.294 5.5M7 9H3V5"
      />
    </svg>
  ),
  language: (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="white"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"
      />
    </svg>
  ),
};

export default function App() {
  const { activeTab, setActiveTab } = useTab();

  const { weather, fullCountry } = useWeather();

  const { language, setLanguage, langs, langModal, setLangModal } =
    useLanguage();

  const { t } = useTranslation();

  const items = [
    {
      icon: icons.overview,
      label: t("menu.overview"),
      onClick: () => setActiveTab("overview"),
    },
    {
      icon: icons.hourly,
      label: t("menu.hourly"),
      onClick: () => setActiveTab("hourly"),
    },
    {
      icon: icons.calendar,
      label: t("menu.Daily"),
      onClick: () => setActiveTab("6 days"),
    },
    {
      icon: icons.language,
      label: t("menu.Language"),
      onClick: () => setLangModal(!langModal),
    },
  ];

  return (
    <div className="md:flex w-screen h-screen overflow-auto">
      {/* Location Badge — overlaps 20% on the search input */}
      {weather && (
        <div className="absolute left-0 scale-[0.75] z-40">
          <LocationBadge content={`${fullCountry}, ${weather.name}`} />
        </div>
      )}
      <LanguageModal
        isOpen={langModal}
        onClose={() => setLangModal(false)}
        langs={langs}
        language={language}
        setLanguage={setLanguage}
      />

      <div className="">
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          className="z-50"
        />
      </div>

      {/* this is a speperated Sidebar if needed. 
      Just Uncomment it.
       */}
      {/* <div className="hidden md:flex">
        <Sidebar />
      </div> */}

      <div className="w-full overflow-auto flex flex-col">
        <GlassSearch />
        {activeTab === "overview" && <WeatherDashboard />}
        {activeTab === "hourly" && <Hourly />}
        {activeTab === "6 days" && <SevenDayWeather />}
      </div>
    </div>
  );
}
