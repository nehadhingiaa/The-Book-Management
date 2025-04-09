import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://localhost:8000/cart"

export const clearCart = createAsyncThunk(
  'cart/clearCart', 
  async (_, { rejectWithValue }) => {
    try {
      await axios.put(API_URL, []);
      return []; 
    } catch (error) {
   
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartData = createAsyncThunk(
  'cart/updateCartData',
  async (cartItems,{rejectWithValue}) => {
   
   try{
    const response = await axios.post(API_URL, cartItems);
    return response.data;
   }
   catch(error){
    return rejectWithValue(error.response.data)
   }
  }
);

export const fetchCartData =createAsyncThunk('cart/FetchCartData',async()=>{
  const response =await axios.get(API_URL)
  return response.data
})

export const deleteCartBook = createAsyncThunk("cartBooks/delete",async(bookId)=>{
await axios.delete(`${API_URL}/${bookId}`);
return bookId;
})


const buyerCartSlice =createSlice({
    name:"buyerCartItems",
    initialState:{buyerCartItems:[],loading:false,error:null},
    reducers:{},
    extraReducers :(builder)=>{
        builder
        .addCase(fetchCartData.pending,(state)=>{
            state.loading =true;
            state.error=null;
        })
        .addCase(fetchCartData.fulfilled,(state,action)=>{
            state.loading=false;
            state.buyerCartItems=action.payload
        })
        .addCase(fetchCartData.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
        .addCase(updateCartData.pending,(state)=>{
          state.loading=false;
          state.error=null
        })
        .addCase(updateCartData.fulfilled,(state,action)=>{
          state.loading=false;
          state.buyerCartItems=action.payload
        })
        .addCase(updateCartData.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.message
        })
        .addCase(deleteCartBook.fulfilled, (state, action) => {
            state.buyerCartItems = state.buyerCartItems.filter((book) => book.id !== action.payload);
          })
        .addCase(clearCart.pending, (state) => {
          state.loading = true;
        })
        .addCase(clearCart.fulfilled, (state) => {
          state.loading = false;
          state.buyerCartItems = []; 
        })
        .addCase(clearCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
})


export default buyerCartSlice.reducer;


