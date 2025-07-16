import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en.json";
import translationPL from "./pl.json";

const resources = {
  en: {translation: translationEN},
  pl: {translation: translationPL},
};

const rawLang = localStorage.getItem("i18nextLng") || navigator.language;
const shortLang = rawLang.split("-")[0];

localStorage.setItem("i18nextLng", shortLang);

i18n.use(initReactI18next).init({
  resources,
  lng: shortLang,
  fallbackLng: "en",
  supportedLngs: ["en", "pl"],
  load: "languageOnly",
  interpolation: {
    escapeValue: false,
  },
  react: {useSuspense: false},
});

export default i18n;
