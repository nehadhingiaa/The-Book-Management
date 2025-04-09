import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";

const SearchForm = ({ onSearch }) => {
  const { t } = useTranslation();

  const [searchQuery, setsearchQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setsearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-gray-200 rounded-lg px-4 py-2 ">
        <button className="md:hidden text-gray-600">
          <i className="fas fa-search"></i>
        </button>

        <input
          type="text"
          value={searchQuery}
          placeholder={t("search")}
          className="hidden md:block w-full p-2 bg-transparent border-none outline-none text-gray-700"
          onChange={handleChange}
        />

        <IoSearchOutline
          className="text-black text-4xl"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchForm;
