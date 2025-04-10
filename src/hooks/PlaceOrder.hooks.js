import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../pages/Buyer/Books/OrdersSlice";
import { toast } from "react-toastify";
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
    initialValues: useMemo(
      () => ({
        totalBooks: subQuantity,
        totalPrice: subTotal,
        tax: "799",
        cartItems: buyerCartData,
        customer: user?.username,
        sellerId: sellerId,
        sellerName: sellerName,
      }),
      [
        subQuantity,
        subTotal,
        buyerCartData,
        user?.username,
        sellerId,
        sellerName,
      ]
    ),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(placeOrder(values)).unwrap();
        toast.success("Order has been placed successfully!");
        dispatch(clearCart());
        resetForm();
        navigate("/buyer-dashboard/orders");
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
    ...formik,
  };
};

export default usePlaceOrder;
