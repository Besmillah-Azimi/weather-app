import React, { useContext, useEffect, useState } from "react";
import { TabContext } from "./contexts/TabContext";
import { LanguageContext } from "./contexts/LanguageContext";
import { TranslateContext } from "./contexts/Translate";
import { motion, AnimatePresence } from "framer-motion";

import LanguageModal from "./style_components/LanguageModal";

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

const menuItems = [
  { id: "Overview", title: "Current", icon: icons.overview },
  { id: "Hourly", title: "Hourly", icon: icons.hourly },
  { id: "6 Days", title: "6 Days", icon: icons.calendar },
  { id: "languages", title: "Languages", icon: icons.language },
];

export default function Sidebar() {
  const { translateText } = useContext(TranslateContext);
  const { language, setLanguage, langs, langModal, setLangModal } =
    useContext(LanguageContext);
  const { setActiveTab } = useContext(TabContext);

  const [translatedMenu, setTranslatedMenu] = useState(menuItems);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  // Translate menu when language changes
  useEffect(() => {
    const translateMenu = async () => {
      try {
        const newMenu = await Promise.all(
          menuItems.map(async (item) => ({
            ...item,
            title: await translateText(item.title),
          }))
        );
        setTranslatedMenu(newMenu);
      } catch (err) {
        console.error("Translation error:", err);
      }
    };
    translateMenu();
  }, [language]);

  // Auto-close dropdown when sidebar closes
  useEffect(() => {
    if (!isOpen) setDropdown(false);
  }, [isOpen]);

  return (
    <>
      <motion.div
        initial={{ width: 60, height: 60 }}
        animate={{
          width: isOpen ? 224 : 60,
          height: isOpen ? "100%" : 60,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed md:relative z-40 bg-white/20 backdrop-blur-2xl text-white border-t border-white/10
          flex ${isOpen ? "md:flex-col" : "flex-row md:flex-col"} items-center
          bottom-0 md:top-0 w-full md:w-auto md:h-screen`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 hover:bg-gray-800 rounded-md m-2 md:self-start"
        >
          {icons.menu}
        </button>

        {/* Menu Items */}
        <ul
          className={`flex w-full transition-all duration-300 
            ${
              isOpen
                ? "flex-col space-y-2 items-start px-2"
                : "flex-row justify-around items-center gap-2 py-2 md:flex-col bg-white/10 backdrop-blur-sm md:justify-start md:space-y-2 md:gap-0"
            }`}
        >
          {translatedMenu.map((item) => (
            <li key={item.id} className="relative">
              <button
                onClick={() => {
                  if (item.id === "languages") setLangModal(true);
                  else {
                    setActiveTab(item.id.toLowerCase());
                    setDropdown(false);
                  }
                }}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800 transition w-full justify-center md:justify-start"
              >
                <span>{item.icon}</span>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <LanguageModal
        isOpen={langModal}
        onClose={() => setLangModal(false)}
        langs={langs}
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
}
