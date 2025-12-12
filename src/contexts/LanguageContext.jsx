import Alert from "../style_components/Alert";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  const [loading, setLoading] = useState(false);
  const [langModal, setLangModal] = useState(false);
  const [alert, setAlert] = useState({ type: "", active: false, message: "" });
  // لیست زبان‌ها (la → lv اصلاح شد)
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
    { code: "lv", name: "Latvian" }, // اصلاح شده
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
    { code: "tr", name: "Türkçe" },
    { code: "uk", name: "Ukrainian" },
    { code: "vi", name: "Vietnamese" },
  ];

  // هر وقت i18n زبان عوض کرد، state رو آپدیت کن
  useEffect(() => {
    const handleChange = (lng) => {
      setLanguage(lng);
      localStorage.setItem("appLanguage", lng);
    };

    i18n.on("languageChanged", handleChange);
    setLanguage(i18n.language); // اولین بار

    return () => i18n.off("languageChanged", handleChange);
  }, [i18n]);

  // وقتی از Context زبان عوض شد، به i18n بگو
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setAlert((prev) => ({
      ...prev,
      active: true,
      type: "success",
      message: "Language is Changed Successfully !",
    }));
  };

  const isRTL = ["ar", "fa", "he", "ku"].includes(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage, // این همون i18n.changeLanguage هست
        langs,
        isRTL,
        loading,
        setLoading,
        langModal,
        setLangModal,
        alert,
        setAlert,
      }}
    >
      {alert.active && !loading && (
        <Alert
          type={alert.type}
          message={alert.message}
          setAlert={setAlert}
          alert={alert}
        />
      )}
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
