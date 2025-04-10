import React from "react";
import PlaceOrder from "./PlaceOrder/PlaceOrderComponent";
import { IoCart } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { Button } from "@headlessui/react";
import { useBuyerCart } from "../../../hooks/BuyerCart.hooks";
import Loader from "../../../components/Elements/Loader/Loader";

const CART = Object.freeze({
  SHOPPING_CART: "Shopping Cart",
});

const BuyerCart = () => {
  const { t } = useTranslation();
  const {
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
  } = useBuyerCart();

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="grid grid-cols-12 gap-5 overflow-auto p-5 min-h-screen">
          <div
            className={`${
              buyerCartData.length!==0 ? "2xl:col-span-9 " : "2xl:col-span-12 "
            } w-full max-w-screen sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12   bg-purple-100 shadow rounded`}
          >
            <div className="flex justify-between items-center p-4">
              <span className="text-5xl">{t("shoppingCart")}</span>
              <div className="flex items-center gap-2 bg-purple-400 text-white text-3xl font-bold px-4 py-2 rounded-lg">
                <span>{t("total")}:</span>
                <span>{cartCount}</span>
              </div>
            </div>

            {buyerCartData.length!==0 ? (
              <table className="w-full table-auto border-collapse overflow-y-auto mt-5">
                <thead className="bg-purple-200">
                  <tr>
                    <th className="px-4 py-2 text-left border-b text-black">
                      {t("product")}
                    </th>
                    <th className="px-4 py-2 text-left border-b text-black">
                      {t("bookTitle")}
                    </th>

                    <th className="px-4 py-2 text-left border-b text-black">
                      {t("price")}
                    </th>
                    <th className="px-4 py-2 text-left border-b text-black">
                      {t("quantity")}
                    </th>

                    <th className="px-4 py-2 text-left border-b text-black">
                      {t("action")}
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-auto">
                  {buyerCartData?.map((book) => (
                    <tr key={book.id}>
                      <td className="px-4 py-2 border-b w-24 h-24">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="book-image w-full sm:w-10 h-10 object-cover"
                        />
                      </td>
                      <td className="px-4 py-2 border-b">{book.title}</td>

                      <td className="px-4 py-2 border-b">
                        <span>rs.</span> {book.price * book.quantity}{" "}
                        <span>/-</span>{" "}
                      </td>
                      <td className="px-4 py-2 border-b text-center">
                        <div className="flex justify-center items-center gap-3 w-full">
                          <span
                            className="text-black text-4xl cursor-pointer"
                            onClick={() => handleDec(book?.id)}
                          >
                            -
                          </span>
                          <button className="border-2 border-purple-300 text-black text-md py-2 px-4 flex items-center justify-center">
                            {book.quantity}
                          </button>
                          <span
                            className="text-black text-4xl cursor-pointer"
                            onClick={() => handleInc(book?.id)}
                          >
                            +
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-2 border-b">
                        <Button
                          className="bg-purple-200 text-black rounded-md text-md p-2"
                          onClick={() => handleRemoveItem(book.id)}
                        >
                          <MdDelete />
                        </Button>
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
                <p className="text-4xl">{t("emptyCart")}</p>
                <p className="text-3xl">{t("cartPara")}</p>
              </div>
            )}
          </div>

          {buyerCartData.length!==0 && (
            <>
              <div className=" w-full h-full bg-purple-100 border-2 border-purple-400 rounded-md col-span-3  sm:col-span-12  md:col-span-12 lg:col-span-12  xl:col-span-12  2xl:col-span-3 ">
                <PlaceOrder
                  buyerCartData={buyerCartData}
                  subQuantity={subQuantity}
                  subTotal={subTotal}
                  sellerId={sellerId}
                  sellerName={sellerName}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default BuyerCart;
