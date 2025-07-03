import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/api/property-types`;

// Get token from localStorage
const getToken = () => {
    const token = localStorage.getItem("adminToken");
    return token ? `Bearer ${token}` : "";
  };


// ✅ 1. Get active types (public)
export const getAllPropertyTypes = createAsyncThunk(
  'propertyTypes/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch');
    }
  }
);

// ✅ Get all types (admin)
export const getAllPropertyTypesAdmin = createAsyncThunk(
    'propertyTypes/getAllAdmin',
    async (_, thunkAPI) => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/all`, {
          headers: {
            Authorization: getToken(),
          },
        });
        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Admin fetch failed');
      }
    }
  );
  
  // ✅ Create
  export const createPropertyType = createAsyncThunk(
    'propertyTypes/create',
    async (newData, thunkAPI) => {
      try {
        const res = await axios.post(`${BASE_URL}`, newData, {
          headers: {
            Authorization: getToken(),
          },
        });
        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Create failed');
      }
    }
  );
  
  // ✅ Update
  export const updatePropertyType = createAsyncThunk(
    'propertyTypes/update',
    async ({ id, updatedData }, thunkAPI) => {
      try {
        const res = await axios.put(`${BASE_URL}/${id}`, updatedData, {
          headers: {
            Authorization: getToken(),
          },
        });
        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed');
      }
    }
  );
  
  // ✅ Delete
  export const deletePropertyType = createAsyncThunk(
    'propertyTypes/delete',
    async (id, thunkAPI) => {
      try {
        await axios.delete(`${BASE_URL}/${id}`, {
          headers: {
            Authorization: getToken(),
          },
        });
        return id;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Delete failed');
      }
    }
  );
  
  // ✅ Toggle Status
  export const togglePropertyTypeStatus = createAsyncThunk(
    'propertyTypes/toggle',
    async (id, thunkAPI) => {
      try {
        const res = await axios.patch(`${BASE_URL}/${id}/toggle`, null, {
          headers: {
            Authorization: getToken(),
          },
        });
        return { id, isActive: res.data.isActive };
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Toggle failed');
      }
    }
  );
// ✅ Initial State
const initialState = {
  list: [],
  adminList: [],
  loading: false,
  error: null,
};

// ✅ Slice
// ✅ Slice
const propertyTypeSlice = createSlice({
    name: 'propertyTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
  
        // 🟢 GET ALL (public)
        .addCase(getAllPropertyTypes.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllPropertyTypes.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload;
        })
        .addCase(getAllPropertyTypes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        })
  
        // 🟢 GET ALL (admin)
        .addCase(getAllPropertyTypesAdmin.fulfilled, (state, action) => {
          state.adminList = action.payload;
        })
        .addCase(getAllPropertyTypesAdmin.rejected, (state, action) => {
          toast.error(action.payload);
        })
  
        // 🟢 CREATE
        .addCase(createPropertyType.fulfilled, (state, action) => {
          state.adminList.unshift(action.payload);
          toast.success("Property Type created successfully!");
        })
        .addCase(createPropertyType.rejected, (state, action) => {
          toast.error(action.payload);
        })
  
        // 🟢 UPDATE
        .addCase(updatePropertyType.fulfilled, (state, action) => {
          const i = state.adminList.findIndex((el) => el._id === action.payload._id);
          if (i !== -1) state.adminList[i] = action.payload;
          toast.success("Property Type updated successfully!");
        })
        .addCase(updatePropertyType.rejected, (state, action) => {
          toast.error(action.payload);
        })
  
        // 🟢 DELETE
        .addCase(deletePropertyType.fulfilled, (state, action) => {
          state.adminList = state.adminList.filter((el) => el._id !== action.payload);
          toast.success("Property Type deleted successfully!");
        })
        .addCase(deletePropertyType.rejected, (state, action) => {
          toast.error(action.payload);
        })
  
        // 🟢 TOGGLE
        .addCase(togglePropertyTypeStatus.fulfilled, (state, action) => {
          const { id, isActive } = action.payload;
          const i = state.adminList.findIndex((el) => el._id === id);
          if (i !== -1) state.adminList[i].isActive = isActive;
          toast.success(`Property Type is now ${isActive ? "Activated" : "Deactivated"}`);
        })
        .addCase(togglePropertyTypeStatus.rejected, (state, action) => {
          toast.error(action.payload);
        });
    },
  });
  

export default propertyTypeSlice.reducer;
