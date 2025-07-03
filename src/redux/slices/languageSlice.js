import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'en',  // قيمة افتراضية
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', action.payload);
      }
    },
    setLanguageFromStorage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage, setLanguageFromStorage } = languageSlice.actions;
export default languageSlice.reducer;
