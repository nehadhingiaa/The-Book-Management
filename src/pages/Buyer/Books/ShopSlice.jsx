import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://localhost:8000/shops"



export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  async () => {
    const response = await axios.get(API_URL);
    return response.data; 
  }
);

// to search filter 
export const loginUser = createAsyncThunk(
  "books/search",
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

const shopSlice =createSlice({
    name:"fetchShops",
    initialState:{shops:[],loading:false,error:null},
    reducers:{

    },
    extraReducers :(builder)=>{
        builder
        .addCase(fetchShops.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchShops.fulfilled,(state,action)=>{
            state.loading =false;
            state.shops =action.payload
        })
        .addCase(fetchShops.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})


export const {logout}=shopSlice.actions;
export const shopReducer= shopSlice.reducer;

