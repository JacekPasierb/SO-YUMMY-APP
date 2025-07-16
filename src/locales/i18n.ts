import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en.json";
import translationPL from "./pl.json";

const resources = {
  en: {translation: translationEN},
  pl: {translation: translationPL},
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "pl"],
    load: "languageOnly",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {useSuspense: false},
  });

export default i18n;
