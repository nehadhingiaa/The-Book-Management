import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Login/authSlice";
import bookListingReducer from "../pages/BookListing/BookSlice";
import cartDataSlice from "../pages/Buyer/Books/OrdersSlice";
import buyerCartReducer from "../pages/Buyer/BuyerCart/Slices/BuyerCartSlices";
import PlaceOrderReducer from "../pages/Buyer/BuyerCart/Slices/PlaceOrdersSlice";
import homeBooksReducer from "../pages/BookListing/BookSliceForHome";
import profileReducer from "../components/Profile/ProfileSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import queryParamReducer from "../pages/Buyer/Shops/ShopsSlice";

const persistConfigCart = {
  key: "cartData",
  storage,
};
const persistConfigQuery = {
  key: "query",
  storage,
};
const persistConfigOrders = {
  key: "orders",
  storage,
};

const persistedCartDataReducer = persistReducer(
  persistConfigCart,
  cartDataSlice
);
const persistedQueryDataReducer = persistReducer(
  persistConfigQuery,
  queryParamReducer
);
const persistedPlaceOrderDataReducer = persistReducer(
  persistConfigOrders,
  PlaceOrderReducer
);

export const store = configureStore({
  reducer: {
    user: authReducer,
    homeBooks: homeBooksReducer,
    books: bookListingReducer,
    cartData: persistedCartDataReducer,
    buyerCartItems: buyerCartReducer,
    orders: persistedPlaceOrderDataReducer,
    profile: profileReducer,
    query: persistedQueryDataReducer,
  },
});

export const persistor = persistStore(store);
export default store;
