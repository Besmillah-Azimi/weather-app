import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { LanguageContext } from "./LanguageContext";
import axios from "axios";
import { TabContext } from "./TabContext";

import {
  TranslateInitialState,
  TRANSLATE_ACTIONS,
  TranslationReducer,
} from "../reducers/TranslationReducer";

export const TranslateContext = createContext();

export default function TranslateProvider({ children }) {
  const { language } = useContext(LanguageContext);

  const { activeTab } = useContext(TabContext);

  const [state, dispatch] = useReducer(
    TranslationReducer,
    TranslateInitialState
  );

  const translateText = async (text) => {
    // 🟢 If language is English, skip API and return text directly
    if (!language || language === "en") {
      return text;
    }

    // await new Promise((r) => setTimeout(r, 300)); // wait 300ms between calls

    try {
      const response = await axios.get(
        "https://api.mymemory.translated.net/get",
        {
          params: {
            q: text,
            langpair: `en|${language}`,
          },
        }
      );
      return response.data.responseData.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // fallback to original text
    }
  };

  const [translated, setTranslated] = useState(state);

  useEffect(() => {
    const translateAll = async () => {
      const newLabels = {};

      switch (activeTab) {
        case "overview":
          dispatch({ type: TRANSLATE_ACTIONS.SET_OVERVIEW });
          for (const key in state.overview) {
            newLabels[key] = await translateText(state.overview[key]);
          }
          break;
        case "hourly":
          dispatch({ type: TRANSLATE_ACTIONS.SET_HOURLY });
          for (const key in state.hourly) {
            newLabels[key] = await translateText(state.hourly[key]);
          }
          break;
        case "6 days":
          dispatch({ type: TRANSLATE_ACTIONS.SET_SIX_DAYS });
          for (const key in state.sixDays) {
            newLabels[key] = await translateText(state.sixDays[key]);
          }
          break;
        default:
          return state;
      }

      setTranslated(newLabels);
    };
  }, [language, activeTab]);

  return (
    <TranslateContext.Provider value={{ translateText, translated }}>
      {children}
    </TranslateContext.Provider>
  );
}
