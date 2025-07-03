import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get token from localStorage
const getToken = () => {
    const token = localStorage.getItem("adminToken");
    return token ? `Bearer ${token}` : "";
  };
// Thunks

export const getAllCities = createAsyncThunk("cities/getAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/cities`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch cities");
  }
});

export const createCity = createAsyncThunk("cities/create", async (cityData, thunkAPI) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/cities`, cityData, {
      headers: {
        Authorization: getToken(),
      },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to create city");
  }
});

export const updateCity = createAsyncThunk("cities/update", async ({ id, cityData }, thunkAPI) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/api/cities/${id}`, cityData, {
      headers: {
        Authorization: getToken(),
      },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to update city");
  }
});

export const deleteCity = createAsyncThunk("cities/delete", async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/cities/${id}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to delete city");
  }
});

// Slice
const citySlice = createSlice({
  name: "cities",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCityError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAllCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCity.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createCity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCity.fulfilled, (state, action) => {
        const index = state.list.findIndex(city => city._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.list = state.list.filter(city => city._id !== action.payload);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCityError } = citySlice.actions;
export default citySlice.reducer;
