import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Elements/Loader/Loader";

import { useTranslation } from "react-i18next";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import Button from "../../../components/Elements/Button/Button";
import shopbackground from "../../../assets/images/shopbackground.jpg";
import { setQuery } from "./ShopsSlice";
import SearchFilter from "../../../components/Elements/SearchFilter/SearchFilter";
import { fetchUser } from "../../Login/LoginApi";

const ShopsComponent = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const sellers =
    Array.isArray(user) && user?.filter((data) => data.user === "seller");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center text-center">
        <Loader loading={loading} />
      </div>
    );
  }

  const handleShops = (seller) => {
    dispatch(
      setQuery({
        sellerId: seller.id,
        sellerName: seller.username,
        shopName: seller.shopName,
      })
    );

    navigate("/buyer-dashboard/books");
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredData = search
    ? sellers.filter((seller) =>
        seller?.shopName?.toLowerCase().includes(search?.toLowerCase())
      )
    : sellers;

  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="min-h-screen p-5">
          <div className="max-w-screen bg-cover h-auto ]">
            <img src={shopbackground} alt="shop-banner" />
          </div>
          <div className="flex justify-between items-center m-auto mb-4 mt-5">
            <h1 className="text-5xl font-semibold mt-5">{"Shops"}</h1>

            <SearchFilter
              value={search}
              onChange={handleSearchChange}
              placeholder={t("searchForSeller")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-10">
            {Array.isArray(filteredData) &&
              filteredData?.map((seller) => {
                return (
                  <div
                    key={seller.id}
                    className="bg-white shadow-lg rounded-lg border border-purple-300 p-5 hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    <div className="flex sm:flex-row">
                      <div className="flex-1 mt-4 sm:mt-0">
                        <h3 className="text-gray-800 text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                          <span className="text-black font-bold">
                            {t("seller")}:
                          </span>{" "}
                          {seller.sellerName}
                        </h3>

                        <p className="text-gray-600 text-lg sm:text-xl md:text-2xl font-medium mb-2">
                          <span className="text-black font-bold">
                            {t("author")}:
                          </span>{" "}
                          {seller.shopName}
                        </p>

                        <div className="flex items-center gap-1 mt-2 text-amber-400 mb-4">
                          <IoIosStar className="text-lg sm:text-xl md:text-2xl" />
                          <IoIosStarHalf className="text-lg sm:text-xl md:text-2xl" />
                          <MdOutlineStarBorderPurple500 className="text-lg sm:text-xl md:text-2xl" />
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <Button
                            className={`w-full sm:w-48 md:w-56   px-6 py-3 rounded-lg shadow-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 ease-in-out`}
                            onClick={() => handleShops(seller)}
                          >
                            {t("exploreBooks")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopsComponent;
