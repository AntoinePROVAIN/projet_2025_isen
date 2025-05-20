// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';

// Déclaration des ressources avec typages
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
} as const;

// Pour permettre à TypeScript de connaître les clés de traduction disponibles
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}

i18n
  // Détection automatique de la langue du navigateur
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  // Configuration
  .init({
    resources,
    fallbackLng: 'en',
   
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;