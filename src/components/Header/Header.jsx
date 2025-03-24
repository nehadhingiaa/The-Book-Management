import React from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa";

const Header = (handleLogout, isSidebarOpen, setIsSidebarOpen) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <header className="fixed flex justify-between items-center top-0 left-0 md:left-[250px] right-0 bg-gradient-to-r from-pink-100 via-purple-200 to-purple-100 h-[60px] p-5 shadow-md">
        <button
          className="md:hidden px-4 py-2 w-20 h-12 bg-purple-600 text-white rounded-lg hover:bg-purple-700 "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
        <h1 className="text-4xl font-semibold">
          {`${
            user?.user.charAt(0).toUpperCase() + user?.user.slice(1)
          } Dashboard`}
        </h1>
        <div className="flex gap-5 ">
          <span className="text-black font-semibold">{user?.name}</span>
          <img
            class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="https://covers.openlibrary.org/b/id/14846156-L.jpg"
            alt="Bordered avatar"
          />

          <button
            className="px-4 py-2 w-24 h-12 bg-purple-200 text-2xl text-black rounded-lg hover:bg-purple-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
