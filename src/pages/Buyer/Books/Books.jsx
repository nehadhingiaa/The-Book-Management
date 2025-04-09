import React from "react";
import { useSelector } from "react-redux";
import { IoIosStar } from "react-icons/io";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import Button from "../../../components/Elements/Button/Button";
import { useTranslation } from "react-i18next";
import SearchFilter from "../../../components/Elements/SearchFilter/SearchFilter";
import Loader from "../../../components/Loader/Loader";
import useBooksData from "./BooksHooks";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Books = () => {
  const {
    books,
    loading,
    handleBooks,
    loadingBookId,
    handleSearchChange,
    search,
    isBookInCart,
  } = useBooksData();

  const { shopName } = useSelector((state) => state.query);

  const { t } = useTranslation();

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="min-h-screen p-5">
          <div>
            <Link to="/buyer-dashboard">
              <FaArrowLeftLong size={32} />
            </Link>
          </div>
          <div className="flex justify-between items-center m-auto mb-4 ">
            <h1 className="text-5xl font-semibold">{shopName}</h1>

            <SearchFilter
              value={search}
              onChange={handleSearchChange}
              placeholder={t("searchBookTitle")}
            />
          </div>
          {books.length === 0 ? (
            <>
              <div className="  max-w-screen w-full flex justify-center items-center m-auto">
                <h1 className=" text-4xl text-gray-600 font-bold">
                  No Books Available
                </h1>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-10">
              {books?.map((book) => {
                const inCart = isBookInCart(book.id);
                return (
                  <div
                    key={book.id}
                    className="bg-white shadow-lg rounded-lg border border-purple-300 p-5 hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="w-full sm:w-36  min-h-full">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                      </div>

                      <div className="flex-1 mt-4 sm:mt-0">
                        <h3 className="text-gray-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                          <span className="text-black font-bold">
                            {t("bookTitle")}:
                          </span>{" "}
                          {book.title}
                        </h3>

                        <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium mb-2">
                          <span className="text-black font-bold">
                            {t("author")}:
                          </span>{" "}
                          {book.author}
                        </p>

                        <div className="text-gray-700 text-md sm:text-lg md:text-xl mb-2">
                          <span className="font-bold text-black">
                            {t("stockCount")}:{" "}
                          </span>
                          {book.stockCount}
                        </div>

                        <div className="flex items-center gap-1 mt-2 text-amber-400 mb-4">
                          <IoIosStar className="text-lg sm:text-xl md:text-2xl" />
                          <IoIosStarHalf className="text-lg sm:text-xl md:text-2xl" />
                          <MdOutlineStarBorderPurple500 className="text-lg sm:text-xl md:text-2xl" />
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <Button
                            className={`w-full sm:w-48 md:w-56 ${
                              book?.stockCount !== 0
                                ? " text-white !hover:bg-purple-600 "
                                : "bg-red-300 border-2 border-red-400 !text-red-500 font-bold !hover:bg-transparent !text-3xl !hover:text-white"
                            }   px-6 py-3 rounded-lg shadow-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out`}
                            onClick={() => handleBooks(book)}
                            disabled={loadingBookId === book.id}
                          >
                            {book?.stockCount === 0 ? (
                              t("soldOut")
                            ) : loadingBookId === book.id ? (
                              <Loader />
                            ) : inCart ? (
                              t("goToCart")
                            ) : (
                              t("addToCart")
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Books;
