import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <footer className="fixed bottom-0 left-0 md:left-[250px] right-0 bg-gradient-to-r from-pink-100 via-purple-200 to-purple-100 h-[50px] flex items-center justify-between px-6 shadow-purple-300">
        <div className="text-gray-700 font-semibold">{t("bookFair")} </div>
      </footer>
    </div>
  );
};

export default Footer;
