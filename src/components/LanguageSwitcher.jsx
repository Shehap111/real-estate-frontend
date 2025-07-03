'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/languageSlice';
import i18n from '../i18n/index';
import flagEn from '../../public/images/flags/us-flag.gif';
import flagAr from '../../public/images/flags/egypt.png';

const languageOptions = [
  { value: 'en', label: 'English', flag: flagEn },
  { value: 'ar', label: 'العربية', flag: flagAr },
];

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const reduxLang = useSelector((state) => state.language.language);

  const [hydrated, setHydrated] = useState(false);
  const [clientLang, setClientLang] = useState(reduxLang || 'en');

  useEffect(() => {
    const savedLang = typeof window !== 'undefined'
      ? localStorage.getItem('language') || reduxLang || 'en'
      : reduxLang || 'en';

    dispatch(setLanguage(savedLang));
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    setClientLang(savedLang);
    setHydrated(true);
  }, [dispatch, reduxLang]);

  const handleLanguageChange = (selectedOption) => {
    if (!selectedOption) return;

    const newLang = selectedOption.value;

    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', newLang);
    setClientLang(newLang);
  };

  // ❌ لا ترندر أي حاجة قبل الـ hydration لتفادي mismatch
  if (!hydrated) return null;

  return (
    <Select
      instanceId="lang-switch"
      options={languageOptions}
      value={languageOptions.find((option) => option.value === clientLang)}
      onChange={handleLanguageChange}
      isSearchable={false}
      className="language-selector phone"
      styles={{
        menu: (provided) => ({ ...provided, zIndex: 9999 }),
        control: (provided) => ({ ...provided, cursor: 'pointer' }),
      }}
      getOptionLabel={(e) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="Flag"
            src={e.flag.src}
            alt={e.label}
            style={{ width: 50, height: 40, padding: 5 }}
          />
          {e.label}
        </div>
      )}
    />
  );
};

export default LanguageSwitcher;
