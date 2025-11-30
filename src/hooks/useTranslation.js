import { useState, useEffect } from "react";

const translations = {
  en: require("../locales/en.json"),
  fa: require("../locales/fa.json"),
  ar: require("../locales/ar.json"),
  tr: require("../locales/tr.json"),
  es: require("../locales/es.json"),
  // ... بقیه رو لازم نیست دستی بنویسی! از این ترفند استفاده کن:
};

// ترفند خودکار: همه فایل‌های locales رو لود کن
const context = require.context("../locales", false, /\.json$/);
context.keys().forEach((key) => {
  const langCode = key.replace("./", "").replace(".json", "");
  translations[langCode] = context(key);
});

export default function useTranslation() {
  const [lang, setLang] = useState("en"); // یا "fa" برای فارسی پیش‌فرض

  // برای ذخیره زبان انتخاب‌شده در localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", lang);
  }, [lang]);

  const t = (key) => {
    try {
      const keys = key.split(".");
      let value = translations[lang];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    } catch {
      return key;
    }
  };

  return { t, lang, setLang, languages: Object.keys(translations) };
}
