import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/users";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Registration Failed");
    }
  }
);

// Login User (GET Request with Email Check)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?email=${email}`);
      if (response.data.length > 0) {
        console.log(response.data[0], "dsadasdsad");
        return response.data[0]; // Return user data if found
      } else {
        return rejectWithValue("User does not exist! Please sign up.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Something went wrong while logging in."
      );
    }
  }
);

// export const loginUser =createAsyncThunk("auth/login" , async (name,email ,{rejectWithValue})=>{
//     try{
//         const response =await axios.post(API_URL)
//         const users = response?.data
//         const user=users.find((u)=>u.name ===name  && u.email === email)
//         if(users) return user
//         return rejectWithValue("User Not Found")

//     }
//     catch(error){
//         return rejectWithValue(error.response.data || "login failed")
//     }
// } )

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: [], loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
