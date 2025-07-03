// src/i18n/config.js

export const fallbackLng = 'en';
export const languages = ['en', 'ar', 'de', 'es'];

export const defaultNS = 'translation';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  };
}
