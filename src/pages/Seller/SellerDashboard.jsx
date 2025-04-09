import React from "react";
import { FaBars, FaBook } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import Button from "../../components/Elements/Button/Button";
import Profile from "../../components/Profile/Profile";
import { useBuyerLayout } from "../../hooks/BuyerLayout.hooks";
import DashboardHeader from "../../components/Header/Header";

const SellerDashboard = () => {
  const { t } = useTranslation();
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isOpen,
    handleShow,
    handleClose,
    profileImg,
    handleLogout,
    user,
  } = useBuyerLayout();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[250px] bg-purple-200 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div
          className={`${
            isSidebarOpen ? "flex justify-center items-center gap-8" : ""
          }`}
        >
          <h2 className="text-4xl text-black font-bold mb-6">
            <span className="text-5xl">📚</span> {t("bookFair")}
          </h2>
          {isSidebarOpen && (
            <Button
              className="md:hidden p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars size={20} />
            </Button>
          )}
        </div>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-500 cursor-pointer">
              <Link
                to="/seller-dashboard/books"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                    isActive
                      ? "bg-purple-500 text-black"
                      : "hover:bg-purple-500"
                  }`
                }
              >
                <span className="flex gap-2">
                  <FaBook className="text-purple-800" />
                  <span className="text-purple-800">{t("books")}</span>
                </span>
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-500 cursor-pointer">
              <Link
                to="/seller-dashboard/orders"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                    isActive
                      ? "bg-purple-500 text-black"
                      : "hover:bg-purple-500"
                  }`
                }
              >
                <span className="flex gap-2">
                  <FaBook className="text-purple-800" />
                  <span className="text-purple-800">{t("orders")}</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col w-full p-5">
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          username={user?.username}
          profileImg={profileImg}
          handleShow={handleShow}
          handleLogout={handleLogout}
          showCart={false}
        />

        <main className="flex-1 w-full mt-16 md:pl-[250px] p-4 pb-[70px] ">
          <div className="py-4">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
      {isOpen && <Profile closeModal={handleClose} />}
    </div>
  );
};

export default SellerDashboard;
