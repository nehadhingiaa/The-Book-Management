import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/users";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    console.log("register action");

    try {
      const existingUser = await axios.get(
        `${API_URL}?username=${userData.username}`
      );

      if (existingUser.data.length > 0) {
        toast.error("Username already taken!");
        return rejectWithValue("Username already exists!");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const response = await axios.post(API_URL, {
        ...userData,
        password: hashedPassword,
      });

      return response.data;
    } catch (error) {
      toast.error("Failed to register user!");
      return rejectWithValue(
        error.response?.data || "Failed to register user!"
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?username=${username}`);

      // If user does not exist
      if (response.data.length === 0) {
        toast.error("User does not exist! Please sign up.");
        return rejectWithValue("User does not exist! Please sign up.");
      }

      const user = response.data[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        toast.error("Invalid password! Please try again.");
        return rejectWithValue("Invalid password!");
      }

      toast.success("Login Successfully!");

      return user;
    } catch (error) {
      toast.error("Something went wrong while logging in.");
      return rejectWithValue(error.response?.data || "Something went wrong.");
    }
  }
);
