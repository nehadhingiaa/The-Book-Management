import { createSlice } from "@reduxjs/toolkit";

import {
  fetchBooks,
  createBooks,
  deleteBook,
  updateBooks,
  searchBooks,
} from "./BookApi";

export const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], stockUpdates: {}, loading: false, error: null },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    resetStockUpdates: (state) => {
      state.stockUpdates = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.stockUpdates = {}; // Reset stock updates on fresh fetch
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(createBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(updateBooks.fulfilled, (state, action) => {
      //   state.books = state.books.map((book) =>
      //     book.id === action.payload.id ? { ...book, ...action.payload } : book
      //   );
      // })
      .addCase(updateBooks.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = {
            ...state.books[index], // Keep existing data
            ...action.payload, // Merge new data
          };
        }
      })
      .addCase(updateBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          (book) => book?.id !== action?.payload
        );
      })
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBooks, updateStock, setSearchQuery, resetStockUpdates } =
  bookSlice.actions;
export default bookSlice.reducer;
