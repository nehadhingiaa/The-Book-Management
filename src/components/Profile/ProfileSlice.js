import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/profile";

export const uploadProfile = createAsyncThunk(
  "profile/uploadProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, data);
      toast.success("Profile has been uploaded");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${data.id}`, data);
      toast.success("Profile has been updated");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);
export const deleteProfile = createAsyncThunk(
  "profile/delete",
  async (userId) => {
    await axios.delete(`${API_URL}/${userId}`);
    return userId;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(uploadProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profile = state.profile.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
