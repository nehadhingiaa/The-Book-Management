import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../../components/Elements/Loader/Loader";
import { FaArrowLeftLong } from "react-icons/fa6";

const AllOrdersComponent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { orders, loading } = useSelector((state) => state.orders);

  const viewOrder = orders.filter((item) => item.id === id);
  console.log(viewOrder, "viewOrder");
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full max-w-screen bg-white p-5">
          <div>
            <Link to="/seller-dashboard/orders">
              <FaArrowLeftLong size={32} />
            </Link>
          </div>
          <div className="mt-5">
            <h1 className="text-5xl font-semibold">{t("viewOrders")} </h1>
          </div>
          <table className="w-full table-auto  mt-5">
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
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {viewOrder?.[0]?.cartItems?.length !== 0 &&
                viewOrder[0].cartItems?.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
               
                    <td className="px-6 py-3 w-20 h-20">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="item-image w-full sm:w-16 h-16 object-cover rounded-md"
                      />
                    </td>

                
                    <td className="px-6 py-3 whitespace-nowrap text-left text-2xl font-medium text-gray-800">
                      {item?.title}
                    </td>

                   
                    <td className="px-6 py-3 whitespace-nowrap text-left text-gray-700">
                      {item?.author}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-left text-gray-700">
                      {item?.quantity}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap text-left text-gray-900 font-semibold">
                      Rs. {item?.price}/-
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AllOrdersComponent;
