import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://localhost:8000/users"

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to register user!");
    }
});

// Login User (GET Request with Email Check)
export const loginUser = createAsyncThunk("auth/loginUser", async (email, { rejectWithValue }) => {

    try {
        const response = await axios.get(`${API_URL}?email=${email}`);
        if (response.data.length === 0) {
            return rejectWithValue("User not found!");
        }
        return response.data[0]; // Returning first matched user
    } 
    catch (error) {
        return rejectWithValue(error.response.data ||"Something went wrong!");
    }
});