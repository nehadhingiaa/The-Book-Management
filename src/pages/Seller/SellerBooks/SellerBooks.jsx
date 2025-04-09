import React from "react";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import Loader from "../../../components/Elements/Loader/Loader";
import SearchFilter from "../../../components/Elements/SearchFilter/SearchFilter";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Elements/Button/Button";
import useSellerBooks from "../../../hooks/SellerBooks.hooks";
import AddBooksComponent from "../../../modals/AddBooks/AddBooksComponent";

const SellerBooks = () => {
  const { t } = useTranslation();
  const {
    isOpen,
    handleShowModal,
    closeModal,
    handleUpdate,
    handleDelete,
    handleSearchChange,
    search,
    selectedBookId,
    sellerBooks,
    loading,
    bookQuantities,
    setSelectedBookId,
  } = useSellerBooks();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen p-5 bg-purple-50">
          <h1 className="text-5xl font-semibold mt-5 mb-5">{t("books")}</h1>
          <div className="flex justify-between text-4xl font-semibold ">
            <SearchFilter
              value={search}
              onChange={handleSearchChange}
              placeholder={t("searchBookTitle")}
            />

            <Button className="" onClick={handleShowModal}>
              {t("addBook")}
            </Button>
          </div>

          <table className="w-full table-auto mt-5">
            <thead className="bg-purple-200">
              <tr>
                <th className="px-4 py-2 text-left  text-black">
                  {t("image")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("bookTitle")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("author")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("stockCount")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("price")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("action")}
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {sellerBooks.length === 0 ? (
                <tr className="">
                  <td colSpan="6" className="text-center py-10 ">
                    <h1 className="text-4xl text-gray-600 font-bold">
                    {t("noBooksAvailable")}
                    </h1>
                  </td>
                </tr>
              ) : (
                sellerBooks.map((book) => {
                  const macthedQuantity = bookQuantities?.find(
                    (item) => item.id === book.id
                  );

                  return (
                    <tr key={book.id} className="border-b border-gray-300">
                      <td className="px-4 py-2 w-16 h-16">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="book-image w-full sm:w-14 h-14 object-cover"
                        />
                      </td>
                      <td className="px-4 py-2">{book?.title}</td>
                      <td className="px-4 py-2">{book?.author}</td>
                      <td className="px-4 py-2">
                        {macthedQuantity?.id === book?.id
                          ? Math.max(
                              0,
                              book.stockCount - macthedQuantity.quantity
                            )
                          : book?.stockCount}
                      </td>
                      <td className="px-4 py-2">Rs.{book?.price}/-</td>
                      <td className="px-4 py-2">
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
      {isOpen && (
        <AddBooksComponent
          bookId={selectedBookId}
          setSelectedBookId={setSelectedBookId}
          showModal={handleShowModal}
          closeModal={closeModal}
          bookQuantities={bookQuantities}
        />
      )}
    </>
  );
};

export default SellerBooks;
