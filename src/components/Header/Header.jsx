import React from "react";
import { FaBars } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import LanguageSelector from "../Elements/LanguageSelector/LanguageSelector";
import Button from "../Elements/Button/Button";
import { useTranslation } from "react-i18next";
import defaultImg from "../../assets/images/defaultImg.jpg"

const DashboardHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
  username,
  profileImg,
  handleShow,
  handleLogout,
  showCart = false,
  cartCount = 0,
}) => {
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const user = userData?.user === "seller" ? "seller" : "buyer";

  return (
    <header className="fixed flex justify-between items-center top-0 left-0 md:left-[250px] right-0 bg-gradient-to-r from-pink-100 via-purple-200 to-purple-100 h-[60px] p-5 shadow-md z-40">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={20} />
        </button>
        <h1 className="text-3xl md:text-3xl font-semibold hidden sm:block">
          {user === "buyer"
            ? `${t("buyer")} ${t("dashboard")}`
            : `${t("seller")} ${t("dashboard")}`}
        </h1>
      </div>

      <div className="flex items-center gap-4 bg-purple-100">
        <span className="text-black font-semibold">{username}</span>

        <LanguageSelector />

        {showCart && (
          <Link to="/buyer-dashboard/cart" className="relative">
            <button className="relative text-black text-2xl p-3 mt-1 w-15 h-15 bg-purple-300 hover:bg-purple-600 rounded-full flex items-center justify-center">
              <IoCart size={40} />
              <span className="absolute -top-1.5 -right-1.5 rounded-full w-7 h-7 bg-red-500 text-white text-2xl flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
          </Link>
        )}

        <div onClick={handleShow}>
          {profileImg ? (
            <img
              className="w-14 h-14 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover cursor-pointer"
              src={profileImg}
              alt="User Avatar"
            />
          ) : (
            <img
              className="w-14 h-14 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover cursor-pointer"
              src={defaultImg}
              alt="User Avatar"
            />
          )}
        </div>

        <Button onClick={handleLogout}>{t("logout")} </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
