import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../components/Elements/Loader/Loader";
import { fetchCartData } from "./Slices/BuyerCartSlices";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../Books/OrdersSlice";

import PlaceOrder from "./PlaceOrder/PlaceOrderComponent";
import { IoCart } from "react-icons/io5";

const BuyerCart = () => {
  // const [showModal,setShowModal]=useState(false)
  const { cartData, loading } = useSelector((state) => state.cartData);
  const cartCount = cartData?.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center text-center">
        <Loader loading={loading} />
      </div>
    );
  }
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
    return cartData.reduce((total, item) => {
      return total + item.price * item.quantity; // Sum of all item totals
    }, 0);
  };

  const calculateSubQuantity = () => {
    return cartData.reduce((total, item) => {
      return total + item.quantity; // Sum of all item totals
    }, 0);
  };

  const subTotal = calculateSubtotal();
  const subQuantity = calculateSubQuantity();

  return (
    <div className="grid grid-cols-12 gap-5 overflow-auto">
      <div
        className={`${
          cartData.length ? "col-span-9 " : "col-span-12 "
        } w-full max-w-screen bg-purple-100 shadow rounded`}
      >
        <div>
          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia maxime incidunt iste quo exercitationem temporibus modi aliquam perferendis dolore nihil nisi nam fugit corporis autem quibusdam, mollitia ipsa ipsam at molestiae excepturi eos ex unde! Architecto sunt non animi enim voluptate eum autem alias error ex? Perspiciatis minus nostrum aperiam!</p> */}
        </div>

        <div className="flex justify-between p-4">
          <span className="text-5xl mt-5">Your Shopping Cart</span>
          <span className="text-5xl mt-5">{cartCount} Items</span>
        </div>
        {cartData?.length ? (
          <table className="w-full table-auto border-collapse overflow-y-auto mt-5">
            <thead className="bg-purple-200">
              <tr>
                <th className="px-4 py-2 text-left border-b text-black">
                  Product
                </th>
                <th className="px-4 py-2 text-left border-b text-black">
                  Book Title
                </th>
                <th className="px-4 py-2 text-left border-b text-black">
                  Author
                </th>
                <th className="px-4 py-2 text-left border-b text-black">
                  Stock Count
                </th>
                <th className="px-4 py-2 text-left border-b text-black">
                  Price
                </th>
                <td className="px-4 py-2 border-b">Quantity</td>
                <th className="px-4 py-2 text-left border-b text-black">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-auto">
              {cartData?.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-2 border-b w-24 h-24">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="book-image w-full sm:w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{book.title}</td>
                  <td className="px-4 py-2 border-b">{book.author}</td>
                  <td className="px-4 py-2 border-b">{book.stockCount}</td>
                  <td className="px-4 py-2 border-b">
                    <span>rs.</span> {book.price * book.quantity}{" "}
                    <span>/-</span>{" "}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="flex justify-center gap-2">
                      <span
                        className="text-black text-5xl cursor-pointer"
                        onClick={() => handleDec(book?.id)}
                      >
                        -
                      </span>
                      <button className=" border-2 border-purple-300 text-black text-md py-2 px-3">
                        {book.quantity}
                      </button>
                      <span
                        className="text-black text-4xl cursor-pointer"
                        onClick={() => handleInc(book?.id)}
                      >
                        +
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="flex gap-2">
                      <button className="bg-purple-200 text-black rounded-md p-2">
                        View
                      </button>
                      <button
                        className="bg-purple-200 text-black rounded-md text-md p-2"
                        onClick={() => handleRemoveItem(book.id)}
                      >
                        Remove
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full min-h-screen flex flex-col justify-center items-center  m-auto">
            <span className="text-9xl">
              <IoCart />
            </span>
            <p className="text-4xl">Your cart is empty</p>
            <p className="text-3xl">
              Looks like you have not made any choice yet..
            </p>
          </div>
        )}
      </div>

      {!!cartData.length && (
        <>
          <div className="col-span-3 h-full bg-purple-100 border-2 border-purple-400 rounded-md">
            <PlaceOrder
              cartData={cartData}
              subQuantity={subQuantity}
              subTotal={subTotal}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BuyerCart;
