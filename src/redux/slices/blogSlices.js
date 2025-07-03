import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/api/blog`;


//   Get token from localStorage
const getToken = () => {
  const token = localStorage.getItem("adminToken");
  return token ? `Bearer ${token}` : "";
};

//   Create Blog
export const createBlog = createAsyncThunk(
  'blog/create',
  async (blogData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(BASE_URL, blogData, {
        headers: { Authorization: getToken() },
      });
      return data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Create failed');
    }
  }
);

//   Get Active Blogs (for public)
export const getAllActiveBlogs = createAsyncThunk(
  'blog/getActive',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(BASE_URL);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

//   Get All Blogs (admin)
export const getAllBlogsAdmin = createAsyncThunk(
  'blog/getAllAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/admin/all`, {
        headers: { Authorization: getToken() },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

//   Update Blog
export const updateBlog = createAsyncThunk(
  'blog/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/${id}`, updatedData, {
        headers: { Authorization: getToken() },
      });
      return data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

//   Toggle Blog Status
export const toggleBlogStatus = createAsyncThunk(
  'blog/toggleStatus',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${BASE_URL}/${id}/toggle`, null, {
        headers: { Authorization: getToken() },
      });
      return { id, isActive: data.blog.isActive };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Toggle failed');
    }
  }
);

//   Get Blog by Slug (for public)
export const getBlogBySlug = createAsyncThunk(
  'blog/getBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${slug}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    publicBlogs: [],
    adminBlogs: [],
    selectedBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.adminBlogs.push(action.payload);
        toast.success('Blog created successfully  ');
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  
      // Get Active Blogs
      .addCase(getAllActiveBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllActiveBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.publicBlogs = action.payload;
      })
      .addCase(getAllActiveBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  
      // Get All Blogs (Admin)
      .addCase(getAllBlogsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminBlogs = action.payload;
      })
      .addCase(getAllBlogsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  
      // Update Blog
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.adminBlogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) {
          state.adminBlogs[index] = action.payload;
          toast.success('Blog updated successfully ✏️');
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        toast.error(action.payload);
      })
  
      // Toggle Blog Status
      .addCase(toggleBlogStatus.fulfilled, (state, action) => {
        const index = state.adminBlogs.findIndex((b) => b._id === action.payload.id);
        if (index !== -1) {
          state.adminBlogs[index].isActive = action.payload.isActive;
          toast.success(`Blog ${action.payload.isActive ? 'Activated' : 'Deactivated'}  `);
        }
      })
      .addCase(toggleBlogStatus.rejected, (state, action) => {
        toast.error(action.payload);
      })
  
      // Get Blog by Slug
      .addCase(getBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(getBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      
        // عرض التوست فقط إذا الخطأ حقيقي (مش slug ناقص أو undefined)
        if (action.payload && action.payload !== 'Invalid slug') {
          toast.error(action.payload);
        }
      });
  },  
});

export default blogSlice.reducer;
