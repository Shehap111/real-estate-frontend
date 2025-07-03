import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/api/contact`;

// Get token from localStorage
const getToken = () => {
  const token = localStorage.getItem("adminToken");
  return token ? `Bearer ${token}` : "";
};

// 🔄 Get Contact Info (public)
export const getContactInfo = createAsyncThunk(
  'contact/getInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(BASE_URL);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

// ✏️ Update Contact Info (admin)
export const updateContactInfo = createAsyncThunk(
  'contact/updateInfo',
  async (infoData, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(BASE_URL, infoData, {
        headers: { Authorization: getToken() },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

// 📤 Create Message (public)
export const createMessage = createAsyncThunk(
  'contact/createMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/message`, messageData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Send failed');
    }
  }
);

// 📥 Get All Messages (admin)
export const getAllMessages = createAsyncThunk(
  'contact/getAllMessages',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/messages`, {
        headers: { Authorization: getToken() },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

// ✅ Mark message as read
export const markMessageAsRead = createAsyncThunk(
  'contact/markAsRead',
  async (messageId, { rejectWithValue }) => {
    try {
      await axios.patch(`${BASE_URL}/message/${messageId}/read`, {}, {
        headers: { Authorization: getToken() },
      });
      return messageId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update');
    }
  }
);

// Delete Message (admin only)
export const deleteMessage = createAsyncThunk(
    'contact/deleteMessage',
    async (messageId, { rejectWithValue }) => {
      try {
        await axios.delete(`${BASE_URL}/message/${messageId}`, {
          headers: { Authorization: getToken() },
        });
        return messageId;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Delete failed');
      }
    }
);
  

const initialState = {
  contactInfo: null,
  messages: [],
  loading: false,
  error: null,
  success: false,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
extraReducers: (builder) => {
  builder
    // Get Contact Info
    .addCase(getContactInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getContactInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.contactInfo = action.payload;
    })
    .addCase(getContactInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    })

    // Update Contact Info
    .addCase(updateContactInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateContactInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.contactInfo = action.payload;
      toast.success('Contact info updated');
    })
    .addCase(updateContactInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    })

    // Create Message
    .addCase(createMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createMessage.fulfilled, (state) => {
      state.loading = false;
      state.success = true
      toast.success('Message sent successfully');
    })
    .addCase(createMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    })

    // Get All Messages
    .addCase(getAllMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllMessages.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    })
    .addCase(getAllMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    })

    .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const existingMessage = state.messages.find(msg => msg._id === action.payload);
      
        // Only show toast if it was unread before
        if (existingMessage && !existingMessage.isRead) {
          toast.success('Marked As Read Message');
        }
      
        // Update state anyway
        state.messages = state.messages.map((msg) =>
          msg._id === action.payload ? { ...msg, isRead: true } : msg
        );
      })

    // Delete Message
    .addCase(deleteMessage.fulfilled, (state, action) => {
      state.messages = state.messages.filter(msg => msg._id !== action.payload);
      toast.success('Message deleted');
    });
},
});
export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
