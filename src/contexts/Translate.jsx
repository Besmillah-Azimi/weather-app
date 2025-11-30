import { createContext, useContext, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import axios from "axios";
import Alert from "../style_components/Alert";
const cache = new Map();

export const TranslateContext = createContext();

export default function TranslateProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const { language, setLanguage } = useContext(LanguageContext);

  const translateText = async (text) => {
    if (!language || language === "en") {
      return text;
    }

    try {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            de: "besmillah5782@gmail.com",
            q: text,
            langpair: `en|${language}`,
          },
        }
      );

      // setAlert({ type: "success", message: "Language Changed Successfully !" });
      return response.data.responseData.translatedText;
    } catch (error) {
      // setLanguage("en"); // revert to English on error
      console.error("Translation error:", error);
      // setAlert({
      //   type: "error",
      //   message: "Translation failed. Reverted to English.",
      // });
      return text; // fallback
    }
  };

  return (
    <TranslateContext.Provider value={{ translateText }}>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {children}
    </TranslateContext.Provider>
  );
}
