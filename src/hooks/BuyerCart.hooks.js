import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData } from "../pages/Buyer/BuyerCart/Slices/BuyerCartSlices";
import { decreaseQuantity, increaseQuantity, removeItem } from "../pages/Buyer/Books/OrdersSlice";


export const useBuyerCart = () => {
  const dispatch = useDispatch();
  const userData =JSON.parse(localStorage.getItem("user"))

  const { sellerId, sellerName } = useSelector((state) => state.query);
  const { cartData, loading } = useSelector((state) => state.cartData);
  const buyerCartData=cartData?.filter((item)=>item.buyerId ===userData.id)

  console.log(buyerCartData,"cartData")
  const cartCount = buyerCartData.length ;

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleInc = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDec = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateSubtotal = () => {
    return buyerCartData.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const calculateSubQuantity = () => {
    return buyerCartData.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const subTotal = calculateSubtotal();
  const subQuantity = calculateSubQuantity();

  return {
    sellerId,
    sellerName,
    buyerCartData,
    loading,
    cartCount,
    handleRemoveItem,
    handleInc,
    handleDec,
    subTotal,
    subQuantity,
  };
};
