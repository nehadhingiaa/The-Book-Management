import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://localhost:8000/orders"

export const placeOrder = createAsyncThunk(
  'cart/updateCartData',
  async (orderItems,{rejectWithValue}) => {
    // Replace the cart data with the selected cart data (this will set an empty or new cart)
   try{
    const response = await axios.post(API_URL, orderItems);
    return response.data;
   }
   catch(error){
    return rejectWithValue(error.response.data)
   }
  }
);

export const fetchOrder = createAsyncThunk(
    'cart/fetchOrders',
    async (orderItems,{rejectWithValue}) => {
      // Replace the cart data with the selected cart data (this will set an empty or new cart)
     try{
      const response = await axios.get(API_URL);
      return response.data;
     }
     catch(error){
      return rejectWithValue(error.response.data)
     }
    }
  );


const placeOrderSlice =createSlice({
    name:"orders",
    initialState:{orders:[],loading:false,error:null},
    reducers:{},
    extraReducers :(builder)=>{
        builder
        .addCase(fetchOrder.pending,(state)=>{
            state.loading =true;
            state.error=null;
        })
        .addCase(fetchOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload
        })
        .addCase(fetchOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
        .addCase(placeOrder.pending,(state)=>{
            state.loading =true;
            state.error=null;
        })
        .addCase(placeOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload
        })
        .addCase(placeOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
      
      
    }
})


export default placeOrderSlice.reducer;


