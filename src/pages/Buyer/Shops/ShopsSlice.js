import { createSlice } from "@reduxjs/toolkit";

const queryParamsSlice=createSlice({
    name:"query",
    initialState:{sellerId:null,sellerName:null,shopName:null},
    reducers:{
        setQuery:(state,action)=>{
            state.sellerId=action.payload.sellerId,
            state.sellerName=action.payload.sellerName
            state.shopName=action.payload.shopName

        },
        clearQuery:(state)=>{
            state.sellerId=[]
            state.sellerName=[]
            state.shopName=[]
        }

        
    }
})
export const {setQuery,clearQuery} =queryParamsSlice.actions
export default queryParamsSlice.reducer