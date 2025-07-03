import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';
import cityReducer from './slices/citySlice';
import propertyTypeReducer from './slices/propertyTypeSlice';
import uploadsReducer from './slices/UploadsSlice';
import propertyReducer from './slices/propertySlice'
import blogReducer from './slices/blogSlices'
import contactReducer from './slices/contactSlice'
import languageReducer from './slices/languageSlice'

export const store = configureStore({
    reducer: {
    admin: adminReducer,
    cities: cityReducer,
    propertyTypes: propertyTypeReducer, 
    uploads: uploadsReducer,       
    property: propertyReducer,      
    blog: blogReducer,
    contact: contactReducer,
    language:languageReducer,

    },
  });

