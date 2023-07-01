import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI
    detection: {
      order: [
        "navigator",
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
      ],
    },
    supportedLngs: ["en", "ko"],
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
