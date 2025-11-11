import React, { useContext, useEffect, useState } from "react";
import { TabContext } from "./contexts/TabContext";
import { LanguageContext } from "./contexts/LanguageContext";
import { TranslateContext } from "./contexts/Translate";

const icons = {
  menu: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
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
      stroke="currentColor"
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
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
      />
    </svg>
  ),
  hourly: (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"
      />
    </svg>
  ),
  language: (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"
      />
    </svg>
  ),
  server: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="8" rx="2" ry="2" />
      <rect x="3" y="12" width="18" height="8" rx="2" ry="2" />
      <path d="M7 8h.01M7 16h.01" />
    </svg>
  ),
};

const menuItems = [
  { id: "Overview", title: "Current", icon: icons.overview },
  { id: "Hourly", title: "Hourly", icon: icons.hourly },
  { id: "6 Days", title: "6 Days", icon: icons.calendar },
  { id: "languages", title: "Languages", icon: icons.language },
];

export default function Sidebar() {
  const { translateText } = useContext(TranslateContext);
  const [translatedMenu, setTranslatedMenu] = useState(menuItems);

  const { language, setLanguage, langs } = useContext(LanguageContext);
  useEffect(() => {
    const translateMenu = async () => {
      const newMenu = [];
      for (const item of menuItems) {
        const translatedTitle = await translateText(item.title);
        newMenu.push({ ...item, title: translatedTitle });
      }
      setTranslatedMenu(newMenu);
    };
    translateMenu();
  }, [language]);
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveTab } = useContext(TabContext);

  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    setDropdown(false);
  }, []);

  return (
    <div
      onClick={() => {
        if (dropdown) setDropdown(false);
      }}
      className={`h-auto md:h-screen space-y-3 backdrop-blur-2xl bg-white/20 text-white flex p-2 transition-all duration-300 ${
        isOpen
          ? "w-screen h-screen absolute z-40 md:relative flex-col md:h-auto md:w-56"
          : "w-screen h-auto space-x-10 md:w-16 md:flex-col"
      }`}
    >
      {/* Toggle button */}
      <button
        className="text-white p-2 hover:bg-gray-800 rounded-md transition mr-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icons.menu}
      </button>

      <ul
        className={`flex space-y-4
        ${
          isOpen
            ? "flex-col justify-left"
            : "md:flex-col mx-auto space-x-10 md:space-x-0"
        }
        `}
      >
        {translatedMenu.map((item) => (
          <li key={item.title}>
            <div
              onClick={() => {
                switch (item.id) {
                  case "Overview":
                    setActiveTab("overview");
                    break;

                  case "Hourly":
                    setActiveTab("hourly");
                    break;

                  case "6 Days":
                    setActiveTab("6 days");
                    break;

                  case "languages":
                    setDropdown(!dropdown);
                    break;

                  default:
                    return item;
                }
              }}
              className="flex items-center gap-3 hover:bg-gray-800 p-1.5 rounded-md cursor-pointer transition"
            >
              <span className="text-gray-300 ">{item.icon}</span>
              <span
                className={`text-sm font-medium overflow-hidden transition-all duration-300 ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                {item.title}
              </span>
            </div>
          </li>
        ))}
        {dropdown && (
          <div className="absolute max-w-50 min-w-[180px] max-h-60 overflow-hidden text-white rounded-lg border border-slate-200 bg-slate-800 shadow-lg shadow-sm focus:outline-none">
            <h2 className=" w-full p-2 text-md text-center border-b font-bold ">
              Select Language
            </h2>
            <div className="p-3 space-y-2 w-full pb-15 overflow-auto max-h-60 scrollbar-thin">
              {langs.map((lang) => (
                <label
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  // className={`has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 text-black has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-3 rounded-md flex justify-between items-center shadow`}
                  className={` ${
                    lang.code === language &&
                    "text-indigo-400 ring-indigo-200  ring-2 "
                  } cursor-pointer bg-slate-900/40 hover:bg-white/20 w-full p-3 rounded-md flex justify-between items-center shadow`}
                >
                  <div class="flex items-center space-x-5">
                    <h2 class="text-sm">{lang.name}</h2>
                  </div>
                  <input
                    type="radio"
                    name="language"
                    checked={lang.code === language}
                    className="checked:border-indigo-500 h-5 w-5"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
