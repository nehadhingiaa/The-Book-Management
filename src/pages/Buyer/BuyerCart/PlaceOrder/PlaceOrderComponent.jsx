import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Loader from "../../../../components/Elements/Loader/Loader";
import Button from "../../../../components/Elements/Button/Button";
// import ConfirmOrderModal from "../../../../components/OrderModal/OrderModal";
import { useTranslation } from "react-i18next";
import usePlaceOrder from "../../../../hooks/PlaceOrder.hooks";

const PlaceOrder = ({
  buyerCartData,
  subQuantity,
  subTotal,
  sellerId,
  sellerName,
}) => {
  const {
    
    loading,
    values,
    handleSubmit,
    handleChange,
    isSubmitting,
  } = usePlaceOrder({
    subQuantity,
    subTotal,
    buyerCartData,
    sellerId,
    sellerName,
  });
  const { t } = useTranslation();

  return (
    <>
      {isSubmitting ? (
        <Loader loading={loading} />
      ) : (
        <div>
          {buyerCartData?.length && (
            <>
              <div className="block m-auto p-10 pt-20">
                <h1 className="text-center text-4xl font-semibold">
                  {t("subtotal")}{" "}
                </h1>
                <div className="mt-5 p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between text-3xl">
                      <span>{t("totalBooks")} </span>
                      <input
                        type="number"
                        name="totalBooks"
                        value={subQuantity}
                        onChange={handleChange}
                        className="text-center"
                      />
                    </div>

                    <div className="flex justify-between text-3xl mt-5">
                      <span>{t("tax")}</span>
                      <input
                        type="number"
                        name="tax"
                        value={values.tax}
                        onChange={handleChange}
                        className="text-center"
                        readOnly
                      />
                    </div>

                    <div className="flex justify-between text-3xl mt-5">
                      <span>{t("totalPrice")} </span>
                      <input
                        type="number"
                        name="totalPrice"
                        value={values.totalPrice || subTotal}
                        onChange={handleChange}
                        className="text-center"
                      />
                    </div>

                    <hr className="text-purple-300 mt-5" />

                    <div className="mt-5">
                      <Button type="submit" className="bg-purple-400 w-full">
                        {t("placeOrder")}
                      </Button>
                    </div>

                    <Link to="/buyer-dashboard/books">
                      <button
                        type="button"
                        className="flex w-full justify-center m-auto text-black bg-purple-300 hover:bg-purple-200 mt-5 hover:text-purple-600"
                      >
                        <span>{t("continueShopping")} </span>{" "}
                        <span>
                          <IoIosArrowRoundForward />
                        </span>
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </>
          )}

          
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
