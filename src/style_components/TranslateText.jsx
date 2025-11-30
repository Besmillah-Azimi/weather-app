import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import { TranslateContext } from "../contexts/Translate";

export default function TranslateTexts({ text = "", className = "" }) {
  const { translateText } = useContext(TranslateContext);
  const { language } = useContext(LanguageContext);

  const [translated, setTranslated] = useState("");

  useEffect(() => {
    const translateAll = async () => {
      const result = await translateText(text);
      setTranslated(result);
    };
    translateAll();
  }, [language, text]);
  return <p className={`${className}`}>{translated}</p>;
}
