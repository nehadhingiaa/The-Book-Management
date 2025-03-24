import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import {
  deleteBook,
  fetchBooks,
  searchBooks,
} from "../../../components/BookListing/BookApi";

import AddBooksComponent from "../../../components/Modals/AddBooks/AddBooksComponent";
import { showDeleteConfirmation } from "../../../components/Elements/SweetAlert/SweetAlertForDelete";
import Loader from "../../../components/Elements/Loader/Loader";

import { setSearchQuery } from "../../../components/BookListing/BookSlice";
import SearchFilter from "../../../components/Elements/SearchFilter/SearchFilter";
import { useTranslation } from "react-i18next";
// import { debounce } from "@mui/material";

const SellerBooks = () => {
  const {t}=useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const [selectedBookId, setSelectedBookId] = useState(null);
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  console.log(books, "books in seller");

  useEffect(() => {
    if (!books || books.length === 0) {
      dispatch(fetchBooks()); // Fetch only if data is empty
    }
  }, [dispatch, books]);

  const handleShowModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = (id) => {
    setIsOpen(true);
    setSelectedBookId(id);
  };

  if (loading) {
    return (
      <div>
        <Loader loading={loading} />
      </div>
    );
  }

  const handleDelete = (id) => {
    showDeleteConfirmation(
      "Are you sure?",
      "You want to delete ? you will not be able to revert this",
      () => dispatch(deleteBook(id))
    );
    // dispatch(deleteBook(id))
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    // Clear previous timeout if it exists
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      dispatch(setSearchQuery(query)); 
      dispatch(searchBooks(query)); 
    }, 500); 

    setDebounceTimeout(timeout); 
  };
  return (
    <>
      <div className="min-h-screen p-5 bg-purple-50">
        <div className="flex justify-between text-4xl font-semibold">
        <div>
            <SearchFilter
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by book title..."
              
              
            />
          </div>
          <button
            className="bg-purple-400 text-white text-md px-10"
            onClick={handleShowModal}
          >
            {t("addBook")}
          </button>
          
        </div>

        <table className="w-full table-auto border-collapse mt-5">
          <thead className="bg-purple-200">
            <tr>
              <th className="px-4 py-2 text-left border-b text-black">{t("image")}</th>
              <th className="px-4 py-2 text-left border-b text-black">
                {t("bookTitle")}
              </th>
              <th className="px-4 py-2 text-left border-b text-black">
                {t("author")}
              </th>
              <th className="px-4 py-2 text-left border-b text-black">
               {t("stockCount")}
              </th>
              <th className="px-4 py-2 text-left border-b text-black">{t("price")}</th>
              <th className="px-4 py-2 text-left border-b text-black">
                {t("action")}
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {books?.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-2 border-b w-16 h-16">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="book-image w-full sm:w-14 h-14 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border-b">{book?.title}</td>
                <td className="px-4 py-2 border-b">{book?.author}</td>
                <td className="px-4 py-2 border-b">{book?.stockCount}</td>
                <td className="px-4 py-2 border-b">rs.{book?.price}/-</td>
                <td className="px-4 py-2 border-b">
                  <span className="flex gap-2">
                    <button
                      className="bg-purple-200 text-black rounded-md"
                      onClick={() => handleUpdate(book.id)}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      className="bg-purple-200 text-black rounded-md"
                      onClick={() => handleDelete(book.id)}
                    >
                      <MdDelete />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isOpen && (
          <AddBooksComponent bookId={selectedBookId} closeModal={closeModal} />
        )}
      </div>
    </>
  );
};

export default SellerBooks;
