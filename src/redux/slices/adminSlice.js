import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Async thunk to login
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email,
        password,
      });

      const token = res.data.token;

      // Save token to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("adminToken", token);
      }

      return { token };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: typeof window !== "undefined" ? localStorage.getItem("adminToken") : null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }
    },
    clearAdmin: (state) => {
      state.token = null;
      state.loading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin, clearAdmin, resetError } = adminSlice.actions;
export default adminSlice.reducer;
