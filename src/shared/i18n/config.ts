import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import ka from "./locales/ka.json";
import en from "./locales/en.json";

const deviceLocale = getLocales()[0]?.languageCode ?? "ka";

i18n.use(initReactI18next).init({
  resources: {
    ka: { translation: ka },
    en: { translation: en },
  },
  lng: deviceLocale === "ka" ? "ka" : "ka",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

export default i18n;
