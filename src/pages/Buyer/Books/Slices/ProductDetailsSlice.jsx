import { createSlice } from "@reduxjs/toolkit";

  
  const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState:{productDetails:{}},
    reducers: {
      productDetails: (state, action) => {
        state.productDetails = action.payload; 
      },
    },
  });
  

  export const {productDetails} =productDetailsSlice.actions
  export default productDetailsSlice.reducer

  






