import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="block text-purple-600 text-2xl font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-purple-300 rounded-lg bg-purple-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
    </div>
  );
};

export default InputField;
