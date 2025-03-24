import { createSlice } from "@reduxjs/toolkit";

  
  const cartDataSlice = createSlice({
    name: 'cartData',
    initialState:{cartData:[]},
    reducers: {
      setData: (state, action) => {
        state.cartData = [...state.cartData, action.payload]; // Immutable update
      },
      increaseQuantity:(state,action)=>{
        const item=state.cartData.find((item)=>item?.id ===action.payload)
        if(item && item.quantity < item.stockCount){
          item.quantity +=1
          item.stockCount-=1
        }
      },
      decreaseQuantity:(state,action)=>{
        const item =state.cartData.find((item)=>item?.id === action.payload)
        if(item && item.quantity > 1){
          item.quantity -=1
          item.stockCount+=1
        }
      },
      removeItem:(state,action)=>{
        state.cartData=state.cartData.filter((item)=>item?.id!== action.payload)
      }
      
    },
  });
  

  export const {setData,removeItem,increaseQuantity,decreaseQuantity} =cartDataSlice.actions
  export default cartDataSlice.reducer

  






