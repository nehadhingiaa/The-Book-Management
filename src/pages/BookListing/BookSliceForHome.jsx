import {createSlice } from "@reduxjs/toolkit";

import { fetchBooksForHome } from "./BookApi";


export const homeBooksSlice =createSlice({
    name:"homeBooks",
    initialState:{homeBooks:[],loading:false,error:null},
    reducers:{
      
    },
    extraReducers :(builder)=>{
        builder
        .addCase(fetchBooksForHome.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchBooksForHome.fulfilled,(state,action)=>{
            state.loading =false;
            state.homeBooks =action.payload
        })
        .addCase(fetchBooksForHome.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })

     
    }
})

export default homeBooksSlice.reducer

  