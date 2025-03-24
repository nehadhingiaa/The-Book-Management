import React, { useState } from "react";
import {
  FaBook,
  FaCarAlt,
  FaBars,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FcShop } from "react-icons/fc";
import { logout } from "../../components/Login/authSlice";
import Swal from "sweetalert2";

const BuyerDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartData } = useSelector((state) => state.cartData);
  //  const {user}=useSelector((state)=>state.user)

  const cartCount = cartData?.length;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "user in buyer dashboard");

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6b46c1", // Purple
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            dispatch(logout()); // Dispatch the logout action
            resolve();
          }, 1500); // Simulate delay for logout process
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/"); // Redirect to home after logout
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[250px] bg-purple-200 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <h2 className="text-2xl text-black font-bold mb-6">📚 BookFair</h2>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-500 cursor-pointer">
              <Link
                to="/buyer-dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                    isActive
                      ? "bg-purple-500 text-black"
                      : "hover:bg-purple-500"
                  }`
                }
              >
                <span className="flex gap-2">
                  <FaBook className="text-black" />
                  <span className="text-black">Books</span>
                </span>
              </Link>
            </li>

            <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-500 cursor-pointer">
              <Link
                to="/buyer-dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                    isActive
                      ? "bg-purple-500 text-black"
                      : "hover:bg-purple-500"
                  }`
                }
              >
                <span className="flex gap-2">
                  <FaCarAlt className="text-black" />
                  <span className="text-black">profile</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 md:left-[250px] bg-gradient-to-r from-pink-100 via-purple-200 to-purple-100 h-16 p-7 shadow-md z-40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaBars />
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold hidden sm:block">
              Buyer Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <span className="text-black font-semibold text-sm md:text-base">
              {user?.name}
            </span>
            <Link to="/buyer-dashboard/cart">
              <button className="relative text-black text-2xl p-2 bg-purple-200 hover:bg-purple-700 rounded-full">
                <IoCart />
                <span className="absolute -top-2 -right-2 rounded-full w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>
            </Link>
            <button
              className="px-3 py-1 bg-purple-200 text-black rounded-lg hover:bg-purple-700 text-sm md:text-base"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 mt-16 md:pl-[250px] p-4 pb-[70px] overflow-y-auto">
          <div className="py-4">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default BuyerDashboardLayout;
