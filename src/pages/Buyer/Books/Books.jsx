import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  searchBooks,
} from "../../../components/BookListing/BookApi";
import { IoIosStar } from "react-icons/io";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import Button from "../../../components/Elements/Button/Button";

import InputField from "../../../components/Elements/InputField/Inputfield";
import { setData } from "./OrdersSlice";
import { setSearchQuery } from "../../../components/BookListing/BookSlice";

// import { fetchShops } from './ShopSlice';

const Books = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const { books } = useSelector((state) => state.books);
  //  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { cartData } = useSelector((state) => state.cartData);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  console.log(cartData, "cartData");

  const handleBooks = (item) => {
    if (item) {
      dispatch(setData(item));
    }
    console.log(item, "items");
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    dispatch(setSearchQuery(query));
    dispatch(searchBooks(query));
  };

  return (
    <>
     <div className="p-5">
     <div className="w-1/2 sm:w-1/2 flex justify-items-start">
        <InputField
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={handleSearchChange}
          className=" p-3 border rounded-lg shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.map((book) => (
          <div
            key={book.id}
            className="book-card bg-white shadow-lg rounded-lg border border-purple-300 p-5 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-56 min-h-full">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="book-details mt-4 sm:mt-0 flex flex-col justify-between">
                <h3 className="book-title text-gray-800 text-xl sm:text-2xl font-semibold leading-tight">
                  <span className="text-black font-bold">Title:</span>{" "}
                  {book.title}
                </h3>
                <span className="book-author text-gray-600 text-lg sm:text-xl font-medium">
                  <span className="text-black font-bold">Author:</span>{" "}
                  {book.author}
                </span>

                <div className="mt-2 text-gray-700 text-md">
                  <span>
                    <span className="font-bold text-black">Stock Count: </span>
                    {book.stockCount}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-amber-400">
                  <IoIosStar className="text-lg" />
                  <IoIosStarHalf className="text-lg" />
                  <MdOutlineStarBorderPurple500 className="text-lg" />
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="text-white bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg shadow-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
                    onClick={() => handleBooks(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>
    </>
  );
};

export default Books;
