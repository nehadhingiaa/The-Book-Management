import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../BuyerCart/Slices/PlaceOrdersSlice";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Elements/Loader/Loader";
import { fetchBooks } from "../../BookListing/BookApi";

const Orders = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const userData = JSON.parse(localStorage.getItem("user"));
  const { orders, loading } = useSelector((state) => state.orders);

  const userOrders = useMemo(
    () =>
      (Array.isArray(orders) ? orders : []).filter(
        (order) =>
          order?.customer === userData?.username &&
          Array.isArray(order?.cartItems) &&
          order.cartItems.length > 0
      ),
    [orders, userData?.username]
  );
  console.log(userOrders, "userOrders");

  useEffect(() => {
    if (books?.length === 0) {
      dispatch(fetchBooks());
    }
    if (orders?.length === 0) {
      dispatch(fetchOrder());
    }
  }, [dispatch, books?.length, orders]);
  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="min-h-screen w-full max-w-screen bg-white p-5 overflow-x-auto">
          <div className="mt-5">
            <h1 className="text-5xl font-semibold">{t("viewOrders")} </h1>
          </div>
          <table className="w-full table-auto border-collapse mt-5">
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
                  {t("quantity")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("price")}
                </th>
                <th className="px-4 py-2 text-left  text-black">
                  {t("subtotal")}
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {userOrders?.length > 0 &&
                userOrders?.map((item) => (
                  <>
                    {item?.cartItems?.map((item) => (
                      <tr key={item.id} className="border-b border-gray-200">
                        {/* Image */}
                        <td className="px-6 py-3 w-20 h-20">
                          <img
                            src={item?.image}
                            alt={item.title}
                            className="item-image w-full sm:w-16 h-16 object-cover rounded-md"
                          />
                        </td>

                        {/* Title */}
                        <td className="px-6 py-3 whitespace-nowrap text-left text-2xl font-medium text-gray-800">
                          {item?.title}
                        </td>

                        {/* Author */}
                        <td className="px-6 py-3 whitespace-nowrap text-left text-gray-700">
                          {item?.author}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-left text-gray-700">
                          {item?.quantity}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-3 whitespace-nowrap text-left text-gray-900 font-semibold">
                          Rs. {item?.price}/-
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-left text-gray-900 font-semibold">
                          Rs. {item?.price * item.quantity}/-
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
