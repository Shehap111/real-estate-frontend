'use client';  // لو بتستخدم Next.js App Router وتحتاج

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import es from './locales/es.json';
import { getOptions } from './config';

// إعداد i18n مع لغة افتراضية ثابتة (en)
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      ...getOptions('en'),  // اللغة الافتراضية إنجليزي
      resources: {
        en: { translation: en },
        ar: { translation: ar },
        de: { translation: de },
        es: { translation: es },
      },
      lng: 'en',
      fallbackLng: 'en',
    });
}

export default i18n;
