import React, { useState } from "react";
import Login from "../../pages/Login/Login";
import LanguageSelector from "../Elements/LanguageSelector/LanguageSelector";
import Button from "../Elements/Button/Button";
import { Translation, useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto min-h-30 flex justify-between items-center auto">
          <div className="text-white text-2xl font-bold">
            <span className="font-semibold text-black text-5xl">
              <span>📚 </span>
              {t("bookFair")}
            </span>
          </div>

          <div className="gap-5 flex justify-between ">
            <Button onClick={showModal} className="h-[35px]">
              {t("login")}
            </Button>

            <LanguageSelector />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
      {isModalOpen && (
        <Login
          showModal={showModal}
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Navbar;
