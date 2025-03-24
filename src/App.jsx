

import * as React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SellerDashboard from "./pages/Seller/SellerDashboard";
import Books from "./pages/Buyer/Books/Books";
import BuyerDashboardLayout from "./pages/Buyer/BuyerDashboardLayout";
import Orders from "./pages/Buyer/Orders/Orders";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import BuyerCart from "./pages/Buyer/BuyerCart/BuyerCart";
import ShopsComponent from "./pages/Buyer/Shops/ShopsComponent";
import SellerOrderComponent from "./pages/Seller/SellerOrders/SellerOrderComponent";
import SellerBooks from "./pages/Seller/SellerBooks/SellerBooks";

const getRoutes = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userType = userData?.user;

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "buyer-dashboard",
      element: <BuyerDashboardLayout />,
      children: [
        { index: true, element: <Books /> },
        { path: "orders", element: <Orders /> },
        { path: "profile", element: <Profile /> },
        { path: "cart", element: <BuyerCart /> },
        { path: "shops", element: <ShopsComponent /> },
      ],
    },
  ];

  if (userType === "seller") {
    routes.push({
      path: "seller-dashboard",
      element: <SellerDashboard />,
      children: [
        { index: true, element: <SellerBooks /> },
        { path: "orders", element: <SellerOrderComponent /> },
      ],
    });
  }

  routes.push({
    path: "*",
    element: <Home />,
  });

  return routes;
};

const router = createBrowserRouter(getRoutes());

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
