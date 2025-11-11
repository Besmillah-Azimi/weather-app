import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const langs = [
    { code: "sq", name: "Albanian" },
    { code: "af", name: "Afrikaans" },
    { code: "ar", name: "Arabic" },
    { code: "az", name: "Azerbaijani" },
    { code: "eu", name: "Basque" },
    { code: "be", name: "Belarusian" },
    { code: "bg", name: "Bulgarian" },
    { code: "ca", name: "Catalan" },
    { code: "zh", name: "Chinese" },
    { code: "hr", name: "Croatian" },
    { code: "da", name: "Danish" },
    { code: "nl", name: "Dutch" },
    { code: "en", name: "English" },
    { code: "fi", name: "Finnish" },
    { code: "fr", name: "French" },
    { code: "gl", name: "Galician" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "he", name: "Hebrew" },
    { code: "hi", name: "Hindi" },
    { code: "hu", name: "Hungarian" },
    { code: "is", name: "Icelandic" },
    { code: "id", name: "Indonesian" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ku", name: "Kurmanji (Kurdish)" },
    { code: "la", name: "Latvian" },
    { code: "lt", name: "Lithuanian" },
    { code: "mk", name: "Macedonian" },
    { code: "no", name: "Norwegian" },
    { code: "fa", name: "Persian (Farsi)" },
    { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" },
    { code: "ro", name: "Romanian" },
    { code: "ru", name: "Russian" },
    { code: "sr", name: "Serbian" },
    { code: "sk", name: "Slovak" },
    { code: "sl", name: "Slovenian" },
    { code: "es", name: "Spanish" },
    { code: "sv", name: "Swedish" },
    { code: "th", name: "Thai" },
    { code: "tr", name: "Turkish" },
    { code: "uk", name: "Ukrainian" },
    { code: "vi", name: "Vietnamese" },
  ];

  const [language, setLanguage] = useState("");
  const savedLanguage = localStorage.getItem("appLanguage");

  useEffect(() => {
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ langs, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
