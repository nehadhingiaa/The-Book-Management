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
import { useTranslation } from "react-i18next";

// import { fetchShops } from './ShopSlice';

const Books = () => {
  const {t}=useTranslation()
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const { books } = useSelector((state) => state.books);


  const { cartData } = useSelector((state) => state.cartData);
  console.log(cartData,"cartData")

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
      <div className="min-h-screen p-5">
        <h1 className="text-5xl font-semibold">{t("books")}</h1>
        {/* Search Input */}
        <div className="w-full sm:w-1/2 mb-6 top-0 mt-5">
          <InputField
            type="text"
            placeholder="Search by book name..."
            value={search}
            onChange={handleSearchChange}
            className="w-full p-3 border rounded-lg shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
          {books?.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-lg rounded-lg border border-purple-300 p-5 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Book Image */}
                <div className="w-full sm:w-48   min-h-full">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Book Details */}
                <div className="flex-1 mt-4 sm:mt-0">
                  <h3 className="text-gray-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                    <span className="text-black font-bold">{t("bookTitle")}:</span>{" "}
                    {book.title}
                  </h3>

                  <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium mb-2">
                    <span className="text-black font-bold">{t("author")}:</span>{" "}
                    {book.author}
                  </p>

                  <div className="text-gray-700 text-md sm:text-lg md:text-xl mb-2">
                    <span className="font-bold text-black">{t("stockCount")}: </span>
                    {book.stockCount}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mt-2 text-amber-400 mb-4">
                    <IoIosStar className="text-lg sm:text-xl md:text-2xl" />
                    <IoIosStarHalf className="text-lg sm:text-xl md:text-2xl" />
                    <MdOutlineStarBorderPurple500 className="text-lg sm:text-xl md:text-2xl" />
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      className="w-full sm:w-48 md:w-56 text-white bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg shadow-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out"
                      onClick={() => handleBooks(book)}
                    >
                      {t("addToCart")}
                    </Button>
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
