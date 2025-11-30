// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// این خط جادویی: یک پرامیس می‌سازیم که وقتی i18n آماده شد، resolve بشه
const i18nReady = new Promise((resolve) => {
  i18n.use(initReactI18next).init(
    {
      lng: localStorage.getItem("appLanguage") || "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      resources: {}, // اول خالی
      react: { useSuspense: false }, // مهم برای React 18
    },
    () => {
      // وقتی init تموم شد → resolve کن
      resolve();
    }
  );
});

// لود زبان‌ها
i18n.on("languageChanged", async (lng) => {
  localStorage.setItem("appLanguage", lng);
  if (!i18n.hasResourceBundle(lng, "translation")) {
    try {
      const mod = await import(`./locales/${lng}.json`);
      i18n.addResourceBundle(
        lng,
        "translation",
        mod.default || mod,
        true,
        true
      );
    } catch (e) {
      console.warn("Language file not found:", lng);
    }
  }
});

// انگلیسی رو فوراً لود کن
import("./locales/en.json").then((mod) => {
  i18n.addResourceBundle("en", "translation", mod.default || mod, true, true);
  i18n.changeLanguage(i18n.language || "en");
});

// این پرامیس رو export کن
export { i18nReady };
export default i18n;
