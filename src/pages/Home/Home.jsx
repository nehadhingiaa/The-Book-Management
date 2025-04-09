import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../../components/Header/Header.css";
import BookListing from "../../pages/BookListing/BookListing";
import { useTranslation } from "react-i18next";

import { SiBookstack } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.user || "{}")?.user || "";
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
          <h2 className="header-title text-4xl text-capitalized">
            {t("homeScreenHeader")}
          </h2>
          <br />
          <p className="header-text text-3xl font-extrabold  opacity-5 shadow-lg sho ">
            {t("description")}
          </p>
        </div>
      </header>
      <div className="h-full">
        <BookListing />
      </div>
      <div>
        <footer className="fixed bottom-0 left-0 right-0 h-[70px] bg-white flex items-center justify-between px-10 shadow-purple-300">
          <div className="text-gray-700 font-semibold flex justify-center gap-2">
            <span>
              <SiBookstack />
            </span>
            <span>{t("bookFair")}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
