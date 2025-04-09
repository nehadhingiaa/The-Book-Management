import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../Buyer/BuyerCart/Slices/PlaceOrdersSlice";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Elements/Loader/Loader";
import { useTranslation } from "react-i18next";

const SellerOrderComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const user = JSON.parse(localStorage.getItem("user"));
  const sellerOrder = orders.filter((u) => u.sellerId === user?.id);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(fetchOrder());
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full max-w-screen bg-purple-100 p-5 mb-4">
          <div className="text-4xl font-semibold mt-6">
            <h1 className="text-5xl">{t("ordersHistory")}</h1>
          </div>
          <table className="w-full border-collapse border border-gray-300 mt-5 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-purple-300 text-gray-700 uppercase text-md tracking-wider">
              <tr className="h-14">
                <th className="px-6 py-3 text-left">{t("orderId")}</th>
                <th className="px-6 py-3 text-left">{t("customer")}</th>
                <th className="px-6 py-3 text-left">{t("totalBooks")} </th>
                <th className="px-6 py-3 text-left">{t("totalPrice")} </th>
                <th className="px-6 py-3 text-left">{t("cartItems")}</th>
              </tr>
            </thead>
            <tbody>
              {sellerOrder?.length === 0 ? (
                <>
                  <tr className="">
                    <td colSpan="6" className="text-center py-10 ">
                      <h1 className="text-4xl text-gray-600 font-bold">
                        {t("noOrders")}
                      </h1>
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {sellerOrder?.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-all`}
                    >
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {order.totalBooks}
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-semibold">
                        ₹ {order.totalPrice}
                      </td>

                      <td className="px-6 py-4">
                        <button className="mt-1 text-purple-600">
                          <GrView
                            size={18}
                            onClick={() =>
                              navigate(
                                `/seller-dashboard/allOrders/${order.id}`
                              )
                            }
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SellerOrderComponent;
