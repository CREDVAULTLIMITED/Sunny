import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import zhTranslation from './locales/zh/translation.json';
import arTranslation from './locales/ar/translation.json';
import ptTranslation from './locales/pt/translation.json';
import deTranslation from './locales/de/translation.json';

// Resources containing all translations
const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  },
  es: {
    translation: esTranslation
  },
  zh: {
    translation: zhTranslation
  },
  ar: {
    translation: arTranslation
  },
  pt: {
    translation: ptTranslation
  },
  de: {
    translation: deTranslation
  }
};

i18n
  // Use backend plugin for loading translations from public/locales folder
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('sunnyLanguage') || 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    returnObjects: true, // Enable returning objects
    
    // Detection options
    detection: {
      // Order of detection
      order: ['localStorage', 'navigator'],
      // Cache user language in localStorage
      caches: ['localStorage'],
      // Key name for storing language
      lookupLocalStorage: 'sunnyLanguage',
    },
    
    // React options
    react: {
      useSuspense: true,
    }
  });

// Special handling for RTL languages
const RTL_LANGUAGES = ['ar'];
document.documentElement.dir = RTL_LANGUAGES.includes(i18n.language) ? 'rtl' : 'ltr';

i18n.on('languageChanged', (lng) => {
  // Update HTML dir attribute when language changes
  document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
});

export default i18n;
