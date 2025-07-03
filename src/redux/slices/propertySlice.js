import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/api/properties`;
import { toast } from 'react-toastify';

// Get token from localStorage
const getToken = () => {
    const token = localStorage.getItem("adminToken");
    return token ? `Bearer ${token}` : "";
  };


// 1. Create Property
export const createProperty = createAsyncThunk(
  'property/create',
  async (propertyData, { rejectWithValue }) => {
    try {
        const {data} = await axios.post(BASE_URL, propertyData, {
            headers: {
                Authorization: getToken(),
            },
        });
        return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Something went wrong');
    }
  }
);

// 2. Get All Active Properties (Public)
export const getAllProperties = createAsyncThunk(
  'property/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(BASE_URL);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// 3. Get All Properties for Admin
export const getAllPropertiesAdmin = createAsyncThunk(
  'property/getAllAdmin',
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/admin/all`, {
            headers: {
                Authorization: getToken(),
            },
        });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// 4. Get Property by Slug
export const getPropertyBySlug = createAsyncThunk(
  'property/getBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const encodedSlug = encodeURIComponent(slug);
      console.log("🚀 Sending request to:", `${BASE_URL}/${encodedSlug}`); // اطبع الريكوست
      const { data } = await axios.get(`${BASE_URL}/${encodedSlug}`);
      return data;
    } catch (err) {
      console.error("🔥 Error fetching property:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.error || 'Something went wrong');
    }
  }
);

// 5. Update Property
export const updateProperty = createAsyncThunk(
  'property/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const {data} = await axios.put(`${BASE_URL}/${id}`, updatedData, {
            headers: {
                Authorization: getToken(),
            }
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// 6. Delete Property
export const deleteProperty = createAsyncThunk(
  'property/delete',
  async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: getToken(),
            },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error);
    }
  }
);

// ✅ Toggle Property Active Status
export const togglePropertyStatus = createAsyncThunk(
  'property/toggleStatus',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${BASE_URL}/${id}/toggle`, null, {
        headers: {
          Authorization: getToken(),
        },
      });

      return { id, isActive: res.data.isActive };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Toggle failed');
    }
  }
);


const propertySlice = createSlice({
  name: 'property',
  initialState: {
    publicProperties: [],
    adminProperties: [],
    selectedProperty: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All (Public)
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.publicProperties = action.payload;
        state.loading = false;
      })
      // Get All (Admin)
      .addCase(getAllPropertiesAdmin.fulfilled, (state, action) => {
        state.adminProperties = action.payload;
        state.loading = false;
      })

      // Get One
      .addCase(getPropertyBySlug.fulfilled, (state, action) => {
        state.selectedProperty = action.payload;
        state.loading = false;
      })

      // Create
      .addCase(createProperty.fulfilled, (state, action) => {
        state.publicProperties.push(action.payload);
        state.loading = false;
        toast.success("Property created successfully");
      })

      // Update
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.adminProperties = state.adminProperties.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
        state.loading = false;
        toast.success("Property updated successfully");
      })

      // Delete
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.adminProperties = state.adminProperties.filter((p) => p._id !== action.payload);
        state.loading = false;
        toast.success("Property deleted successfully");
      })

      // ✅ TOGGLE PROPERTY STATUS
      .addCase(togglePropertyStatus.fulfilled, (state, action) => {
        const { id, isActive } = action.payload;
        const i = state.adminProperties.findIndex((p) => p._id === id);
        if (i !== -1) {
          state.adminProperties[i].isActive = isActive;
          toast.success(`Property is now ${isActive ? "Activated" : "Deactivated"}`);
        }
      })
      .addCase(togglePropertyStatus.rejected, (state, action) => {
        toast.error(action.payload || "Failed to toggle property status");
      })

      // ✅ Loading & Error Handling
      // .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // توست عام لأي فشل مش متغطي فوق
        if (!action.type.startsWith("property/toggleStatus")) {
          toast.error(action.payload || "Something went wrong");
        }
      });
  },
});

export const { clearSelectedProperty } = propertySlice.actions;
export default propertySlice.reducer;
