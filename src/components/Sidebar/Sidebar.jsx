import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaBook, FaShoppingCart, FaUser, FaCarAlt } from "react-icons/fa";

const Sidebar = (props) => {
    const isSidebarOpen =props?.isSidebarOpen

 
  return (
    <div>
        <aside
            className={`fixed left-0 top-0 bottom-0 w-[250px] bg-gray-200 p-5 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
          >
            <h2 className="text-2xl font-bold mb-6">📚 BookFair</h2>
            <nav>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-500 cursor-pointer">
                <NavLink
                    to="/buyer-dashboard"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                      }`
                    }
                  >
                    <FaHome />
                    <span>Dashboard</span>
                  </NavLink>
                  
                </li>
                <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-500 cursor-pointer">
                 <NavLink
                    to="/buyer-dashboard/books"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                      }`
                    }
                  >
                    <FaBook />
                    <span>Books</span>
                  </NavLink>
                </li>
                <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-500 cursor-pointer">
                <NavLink
                    to="/buyer-dashboard/orders"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                      }`
                    }
                  >
                    <FaCarAlt />
                    <span>Orders</span>
                  </NavLink>
                 
                </li>
                <li className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-500 cursor-pointer">
                <NavLink
                    to="/buyer-dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                        isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500"
                      }`
                    }
                  >
                    <FaUser />
                    <span>Orders</span>
                  </NavLink>
                 
                </li>
              </ul>
            </nav>
          </aside>
    </div>
  )
}

export default Sidebar
