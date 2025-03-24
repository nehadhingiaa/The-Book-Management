import React, { useState } from 'react'
import { FaHome, FaBook, FaShoppingCart, FaUser, FaCarAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import { IoCart } from "react-icons/io5";
import { useDispatch,} from 'react-redux';
import { FcShop } from "react-icons/fc";
import { MdDelete, MdOutlineEdit, MdOutlineStarBorderPurple500 } from "react-icons/md";
import { logout } from '../../components/Login/authSlice';
import Swal from 'sweetalert2';

const SellerDashboard = () => {

  const user =JSON.parse(localStorage.getItem(('user')))
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch=useDispatch()
    const navigate=useNavigate()

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
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          navigate("/"); // Redirect to home after logout
        }
      });
    
    
      
     
    }
  
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
            to="/seller-dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-purple-500 text-black" : "hover:bg-purple-500"
              }`
            }
          >
            <span className='flex gap-2'>
            <FaBook className='text-black' />
            <span className='text-black'>My Books</span>
            </span>
          </Link>
        </li>

        <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-purple-500 cursor-pointer">
          <Link
            to="/seller-dashboard/orders"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                isActive ? "bg-purple-500 text-black" : "hover:bg-purple-500"
              }`
            }
          >
            <span className='flex gap-2'>
            <FaBook className='text-black' />
            <span className='text-black'>Orders</span>
            </span>
          </Link>
        </li>
         
        </ul>
      </nav>
    </aside>
   

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="fixed flex justify-between items-center top-0 left-0 md:left-[250px] right-0 bg-gradient-to-r from-pink-100 via-purple-200 to-purple-100 h-[60px] p-5 shadow-md">
        <button
          className="md:hidden px-4 py-2 w-20 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {/* <FaBars /> */} neha
        </button>
        <h1 className="text-4xl font-semibold">Seller Dashboard</h1>
       <div className='flex gap-5 '> 
       <span className='text-black font-semibold'>{user?.name}</span>
        <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
         src="/docs/images/people/profile-picture-5.jpg" alt="Bordered avatar"/>

        <button className="px-4 py-2 w-24 h-12 bg-purple-200 text-2xl text-black rounded-lg hover:bg-purple-700" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className=" pl-[250px] max-w-screen md:pl-[250px] pb-[70px] h-[calc(100vh-60px)] flex p-4">
      
       <Outlet />
       
      </main>

      {/* Footer */}
     <Footer/>
    </div>
  </div>
   
  )
}

export default SellerDashboard
