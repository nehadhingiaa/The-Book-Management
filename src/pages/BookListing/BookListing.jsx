import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchBooksForHome } from "./BookApi";

const BookListing = () => {
  const dispatch = useDispatch();
  const { homeBooks } = useSelector((state) => state?.homeBooks);

  useEffect(() => {
    dispatch(fetchBooksForHome());
  }, [dispatch]);

  console.log(homeBooks, "homeBooks");

  return (
    <div className="book-list px-4 sm:px-10 md:px-20 py-10 bg-purple-100">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 "
        style={{ marginBottom: "50px" }}
      >
        {homeBooks?.length > 0 &&
          homeBooks?.map((book) => (
            <div
              key={book.id}
              className="book-card cols-span-1 h-auto bg-purple-50 border-2 border-purple-300 rounded shadow-xl"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image w-full h-full sm:w-48 object-cover"
                  />
                </div>

                <div className="book-details mt-4 sm:mt-0">
                  <h3 className="book-title text-gray-600 text-xl sm:text-3xl">
                    <span className="font-bold text-black text-3xl">
                      Title:
                    </span>{" "}
                    {book.title}
                  </h3>
                  <p className="book-author text-gray-600 text-xl sm:text-3xl">
                    <span className="font-bold text-black text-3xl">
                      Author:
                    </span>{" "}
                    {book.author}
                  </p>
                  <p className="book-description text-gray-600 text-xl sm:text-3xl">
                    <span className="font-bold text-black text-3xl">
                      Description:
                    </span>{" "}
                    {book.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookListing;
