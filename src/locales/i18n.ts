import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importujemy pliki z tłumaczeniami
import translationEN from "./en.json";
import translationPL from "./pl.json";

const resources = {
  en: { translation: translationEN },
  pl: { translation: translationPL },
};

i18n
  .use(LanguageDetector) // Automatyczne wykrywanie języka
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Domyślny język
    interpolation: {
      escapeValue: false,
    },
  });
  console.log("Załadowane języki:", i18n.options.resources);
export default i18n;
