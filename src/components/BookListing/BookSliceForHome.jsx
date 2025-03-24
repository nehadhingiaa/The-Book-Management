import {createSlice } from "@reduxjs/toolkit";

import { fetchBooksForHome } from "./BookApi";





export const homeBooksSlice =createSlice({
    name:"books",
    initialState:{books:[],loading:false,error:null},
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
            state.books =action.payload
        })
        .addCase(fetchBooksForHome.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })

     
    }
})

export default homeBooksSlice.reducer

  