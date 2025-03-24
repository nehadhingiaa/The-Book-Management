// SearchFilter.js
import React from 'react';
import InputField from '../InputField/Inputfield';
// Assuming you've already created the reusable InputField component

const SearchFilter = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-5">
      <InputField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-yellow-100`}
      />
    </div>
  );
};

export default SearchFilter;
