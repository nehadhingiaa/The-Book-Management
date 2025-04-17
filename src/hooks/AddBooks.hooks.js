import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createBooks, updateBooks } from "../pages/BookListing/BookApi";
import { toast } from "react-toastify";

export const useAddBookForm = ({
  bookId,
  bookQuantities,
  setSelectedBookId,
  closeModal,
  validationSchema,
}) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { books } = useSelector((state) => state.books);

  const [preview, setPreview] = useState(null);

  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    stockCount: "",
    quantity: 1,
    price: 0,
    sellerId: user?.id,
    shopName: user?.shopName,
    image: null,
  });

  const selectedBook = books.find((book) => book.id === bookId);

  useEffect(() => {
    if (selectedBook) {
      const matchedQuantity = bookQuantities.find(
        (bq) => bq.id === selectedBook.id
      );

      setInitialValues({
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedBook.price,
        stockCount: matchedQuantity
          ? Math.max(0, selectedBook.stockCount - matchedQuantity.quantity)
          : selectedBook.stockCount || null,
        image: selectedBook.image || "",
        quantity: 1,
        sellerId: user?.id,
        shopName: user?.shopName,
      });

      setPreview(selectedBook.image || null);
    } else {
      resetForm();
    }
  }, [selectedBook, bookQuantities]);

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    resetForm,
    isSubmitting,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (bookId) {
        try {
          const existingBook = books.find((book) => book.id === bookId);
          dispatch(updateBooks({ ...existingBook, ...values }));
          closeModal();
          toast.success("Book has been updated successfully")
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await dispatch(createBooks(values));
          closeModal();
          toast.success("Book has been created successfully");
        } catch {
          toast.error("something went wrong");
        }
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
        setFieldValue("image", reader.result);
      };
    }
  };

  const handleClose = () => {
    resetForm();
    setSelectedBookId(null);
    closeModal();
  };

  return {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    resetForm,
    handleFileChange,
    handleClose,
    preview,
    isSubmitting,
  };
};
