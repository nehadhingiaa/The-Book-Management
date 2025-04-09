import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearCart } from "../pages/Buyer/Books/OrdersSlice";
import { toast } from "react-toastify";
import persistStore from "redux-persist/es/persistStore";
import { placeOrder } from "../pages/Buyer/BuyerCart/Slices/PlaceOrdersSlice";

const usePlaceOrder = ({
  subQuantity,
  subTotal,
  buyerCartData,
  sellerId,
  sellerName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.orders);
  const user = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: {
      totalBooks: subQuantity,
      totalPrice: subTotal,
      tax: "799",
      cartItems: buyerCartData,
      customer: user?.username,
      sellerId: sellerId,
      sellerName: sellerName,
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        debugger
        await dispatch(placeOrder(values));
        toast.success("Order has been placed successfully!");
        resetForm();
        dispatch(clearCart());
        navigate("/buyer-dashboard/orders");
        persistStore.flush();
      } catch {
        toast.error("Failed to place the order");
      }
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    handleCloseModal,
    loading,
    ...formik, // Spreading Formik methods (handleSubmit, handleChange, values, etc.)
  };
};

export default usePlaceOrder;
