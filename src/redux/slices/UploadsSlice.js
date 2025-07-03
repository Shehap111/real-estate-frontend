import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_UPLOAD_URL = `${API_BASE_URL}/api/upload`;
const BASE_UPLOAD_360_URL = `${API_BASE_URL}/api/upload-360`;

// Get token from localStorage
const getToken = () => {
  const token = localStorage.getItem("adminToken");
  return token ? `Bearer ${token}` : "";
};

// 🔁 Upload normal image
export const uploadImage = createAsyncThunk(
  'image/upload',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(BASE_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: getToken(),
        },
      });
      return res.data.url;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

// 🔁 Upload 360 image
export const uploadImage360 = createAsyncThunk(
  'image/upload360',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image360', file);

      const res = await axios.post(BASE_UPLOAD_360_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: getToken(),
        },
      });
      return res.data.url;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

// 🔧 Slice
const imageUploadSlice = createSlice({
  name: 'image',
  initialState: {
    imageUrl: '',
    image360Url: '',
    loading: false,
    error: null,
  },
  reducers: {
    clearImage: (state) => {
      state.imageUrl = '';
      state.image360Url = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Normal Image
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 360 Image
      .addCase(uploadImage360.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage360.fulfilled, (state, action) => {
        state.loading = false;
        state.image360Url = action.payload;
      })
      .addCase(uploadImage360.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearImage } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
