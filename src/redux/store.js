import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/Login/authSlice"
import bookListingReducer from "../components/BookListing/BookSlice"
import {shopReducer} from "../pages/Buyer/Books/ShopSlice"
import cartDataSlice from "../pages/Buyer/Books/OrdersSlice"
// import fetchUserSlice from "../components/Login/FetchUSerDataSlice"
import productDetailsSlice from "../pages/Buyer/Books/Slices/ProductDetailsSlice"
import buyerCartSliceReducer from "../pages/Buyer/BuyerCart/Slices/BuyerCartSlices"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import PlaceOrderReducer from "../pages/Buyer/BuyerCart/Slices/PlaceOrdersSlice"

import homeBooksReducer from "../components/BookListing/BookSliceForHome"

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, cartDataSlice);


export const store =configureStore({
    reducer:{
        homeBooks:homeBooksReducer,
        user:authReducer,
        books:bookListingReducer,
        shops:shopReducer,
        cartData:cartDataSlice,
        // user:fetchUserSlice,
        productDetails:productDetailsSlice,
        buyerCartItems:buyerCartSliceReducer,
        persistedReducer,
        orders:PlaceOrderReducer
    },
    // preloadedState: {
    //     auth: {
    //         user: storedUser,
    //         loading: false,
    //         error: null,
    //     },
    // },

});

export const persistor = persistStore(store);
export default store
