import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  searchBooks,
} from "../../BookListing/BookApi";
import { fetchOrder } from "../BuyerCart/Slices/PlaceOrdersSlice";
import { useNavigate } from "react-router-dom";
import { setData } from "./OrdersSlice";
import { toast } from "react-toastify";
import { setSearchQuery } from "../../BookListing/BookSlice";

const useBooksData = () => {
  const dispatch = useDispatch();
  const [loadingBookId, setLoadingBookId] = useState(false);
  const { books, loading } = useSelector((state) => state.books);
  const { orders } = useSelector((state) => state.orders);
  const userData = JSON.parse(localStorage.getItem("user"));
  const { sellerId } = useSelector((state) => state.query);
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.cartData);
  const [search, setSearch] = useState("");
  const buyerCartData =cartData?.filter((item)=>item.buyerId ===userData?.id)

  const userOrders = orders?.filter(
    (order) =>
      order.customer === userData?.username && order.cartItems?.length > 0
  );

  const sellerBooks = books?.filter((book) => book.sellerId === sellerId);

  const updateStockCounts = (sellerBooks, userOrders) => {
    const updatedBooks = sellerBooks.map((book) => ({ ...book }));
  
    userOrders?.forEach((order) => {
      order?.cartItems?.forEach((item) => {
        const bookIndex = updatedBooks.findIndex((book) => book.id === item.id);
        if (bookIndex !== -1) {
          updatedBooks[bookIndex] = {
            ...updatedBooks[bookIndex],
            stockCount: Math.max(
              updatedBooks[bookIndex].stockCount - item.quantity,
              0
            ),
          };
        }
      });
    });

    return updatedBooks;
  };
  const updatedBooks = updateStockCounts(sellerBooks, userOrders);

  const handleBooks = (item) => {
    if (!item && !item?.stockCount) return;
    const isBookInCart = buyerCartData.some((cartItem) => cartItem.id === item.id);

    if (isBookInCart) {
      navigate("/buyer-dashboard/cart");
    } else {
      setLoadingBookId(item.id);
      const buyerName = userData.username;
      const buyerId = userData.id; 
      const updatedItem = {
        ...item,
        buyerName,
        buyerId,
      };

      dispatch(setData(updatedItem));

      setTimeout(() => {
        setLoadingBookId(null);
        toast.success("Book has been added to the cart");
      }, 1000);
    }
  };

  useEffect(() => {
    if (books?.length === 0) {
      dispatch(fetchBooks());
    }
    if (orders?.length === 0) {
      dispatch(fetchOrder());
    }
  }, [dispatch, books?.length, orders?.length]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    dispatch(setSearchQuery(query));
    dispatch(searchBooks(query));
  };

  const isBookInCart = (bookId) => {
    return (
      Array.isArray(buyerCartData) && buyerCartData.some((item) => item.id === bookId)
    );
  };

  return {
    loadingBookId,
    setLoadingBookId,
    books: updatedBooks,
    loading,
    handleBooks,
    handleSearchChange,
    search,
    isBookInCart,
  };
};

export default useBooksData;
