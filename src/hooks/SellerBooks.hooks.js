import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, searchBooks } from "../pages/BookListing/BookApi";
import { fetchOrder } from "../pages/Buyer/BuyerCart/Slices/PlaceOrdersSlice";
import { setSearchQuery } from "../pages/BookListing/BookSlice";
import { toast } from "react-toastify";

const useSellerBooks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { books, loading } = useSelector((state) => state.books);
  const { orders } = useSelector((state) => state.orders);

  const sellerBooks = books?.filter((book) => book?.sellerId === user?.id);

  useEffect(() => {
    if (!books || books.length === 0) {
      dispatch(fetchBooks());
    }
    if (orders?.length === 0) {
      dispatch(fetchOrder());
    }
  }, [dispatch, books?.length, orders?.length]);

  const handleShowModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdate = (id) => {
    setIsOpen(true);
    setSelectedBookId(id);
  };
  const handleClose = () => {
    setIsDelete(false);
  };

  const handleOpen = () => {
    setIsDelete(true);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      dispatch(setSearchQuery(query));
      dispatch(searchBooks(query));
    }, 500);

    setDebounceTimeout(timeout);
  };

  const bookQuantities = Object.entries(
    Array.isArray(orders) &&
      orders
        .flatMap((order) => order.cartItems)
        .reduce((acc, item) => {
          acc[item?.id] = (acc[item?.id] || 0) + item?.quantity;
          return acc;
        }, {})
  ).map(([id, quantity]) => ({ id, quantity }));

  return {
    isOpen,
    handleShowModal,
    closeModal,
    handleUpdate,
    handleOpen,
    handleSearchChange,
    search,
    selectedBookId,
    sellerBooks,
    loading,
    bookQuantities,
    setSelectedBookId,
    handleClose,
    isDelete,
  };
};

export default useSellerBooks;
