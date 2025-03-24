import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "../Header/Header.css";
import BookListing from "../BookListing/BookListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../BookListing/BookApi";
import { useTranslation } from "react-i18next";
import Footer from "../Footer/Footer";
import { SiBookstack } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.user || "{}")?.user || "";

  const [searchQuery] = useState(""); // store search query in parent state

  const dispatch = useDispatch();

  // Access Redux state
  const { books, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks()); // Dispatch fetchBooks whenever searchQuery changes
  }, [searchQuery, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    if (role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (role === "seller") {
      navigate("/seller-dashboard");
    } else {
      navigate("/");
    }
  }, [role]);

  return (
    <div className="holder">
      <header>
        <Navbar />
        <div className="header-content flex flex-c text-center text-white">
          <h2 className="header-title text-capitalized">
            {t("homeScreenHeader")}
          </h2>
          <br />
          <p className="header-text text-3xl font-extrabold opacity-5">
            {t("description")}
          </p>
          {/* <SearchForm /> */}
        </div>
      </header>
      <div className="h-full">
        <BookListing books={books} />
      </div>
      <div>
        <footer className="fixed bottom-0 left-0 right-0 h-[70px] bg-white flex items-center justify-between px-10 shadow-purple-300">
          <div className="text-gray-700 font-semibold flex justify-center gap-2">
            <span>
              <SiBookstack />
            </span>
            <span>{t("homePageHeader")}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
