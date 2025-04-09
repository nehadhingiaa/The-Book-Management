import React from "react";
import clsx from "clsx"; // Ensure clsx is installed: npm install clsx
import InputField from "../InputField/Inputfield";

const SearchFilter = ({ value, onChange, placeholder = "Search...", className }) => {
  return (
    <div className={clsx("", className)}>
      <InputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(" text-md w-[100px] h-[38px]", className)}
      />
    </div>
  );
};

export default SearchFilter;
