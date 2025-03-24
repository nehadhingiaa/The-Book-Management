import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/books";
const BASE_URL1 = "http://localhost:8000/homeBooks";

// fetchBooksForHome

export const fetchBooksForHome = createAsyncThunk("books/fetchBooksForHome", async () => {
  const response = await axios.get(BASE_URL1);
  return response.data
});



export const searchBooks = createAsyncThunk(
  "books/search",
  async (title, { rejectWithValue, getState }) => {
    try {
      // If the title is not empty, filter locally
      const { books } = getState().books; // Access books from the Redux store

      if (title.trim()) {
        const filteredBooks = books.filter(book =>
          book.title.toLowerCase().includes(title.toLowerCase())
        );
        return filteredBooks; 
      }

    
      return books; // Return full list
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to search books.");
    }
  }
);



// 🔹 Fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const response = await axios.get(BASE_URL);
    return response.data
});

// 🔹 Create a new book
export const createBooks = createAsyncThunk("books/createBooks", async (bookData,rejectWithValue) => {
   try{
    const response =await axios.post(BASE_URL,bookData)
    return response.data
   }
   catch(error){
    return rejectWithValue(error.response.data)
   }
});

//Update the book

export const updateBooks = createAsyncThunk(
  "books/updateBooks",
  async ({ id, ...bookData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, bookData); 
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


//delete Book
export const deleteBook = createAsyncThunk("book/delete",async(bookId)=>{
  await axios.delete(`${BASE_URL}/${bookId}`);
  return bookId;
  })
