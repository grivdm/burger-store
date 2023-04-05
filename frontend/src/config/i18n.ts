import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector'
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en',
    debug: true,
    
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
        useSuspense: false,
    },

    // detection: {
    //     order: ['queryString', 'cookie'],
    // }

  });

export default i18n;