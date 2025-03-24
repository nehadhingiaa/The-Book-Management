import { createSlice} from "@reduxjs/toolkit";

import {fetchBooks,createBooks, deleteBook, updateBooks, searchBooks } from "./BookApi";




export const bookSlice =createSlice({
    name:"books",
    initialState:{books:[],loading:false,error:null},
    reducers:{
        setBooks: (state, action) => {
            state.books = action.payload; // Set all books in the state
          },
          setSearchQuery: (state, action) => {
            state.searchQuery = action.payload; // Store search query for reference
          }
    },
    extraReducers :(builder)=>{
        builder
        .addCase(fetchBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(fetchBooks.fulfilled,(state,action)=>{
            state.loading =false;
            state.books =action.payload
        })
        .addCase(fetchBooks.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })

        .addCase(createBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(createBooks.fulfilled,(state,action)=>{
            state.loading =false;
            state.books.push(action.payload)
        })
        .addCase(createBooks.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
        .addCase(updateBooks.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updateBooks.fulfilled, (state, action) => {
            const index = state.books.findIndex((book) => book.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = { ...state.books[index], ...action.payload }; 
            }
        })
        
        .addCase(updateBooks.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
        .addCase(deleteBook.fulfilled,(state,action)=>{
            state.books=state.books.filter((book)=>book?.id!==action?.payload)
        })
        .addCase(searchBooks.pending, (state) => {
            state.loading = true; // Set loading state while searching
        })
        .addCase(searchBooks.fulfilled, (state, action) => {
        state.books = action.payload; // Update books with search result (filtered or full list)
        state.loading = false; // Reset loading state
        })
        .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false; // Reset loading state
        state.error = action.payload; // Set error message
        });
    }
})

export const { setBooks, setSearchQuery } = bookSlice.actions;
export default bookSlice.reducer;