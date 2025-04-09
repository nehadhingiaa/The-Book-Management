import React from "react";

const TextAreaField = ({ label, name, value, onChange, placeholder, rows = 3, className = "" }) => {
  return (
    <div>
      <label className="block text-purple-600 text-2xl font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 border border-purple-300 rounded-lg bg-purple-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      />
    </div>
  );
};

export default TextAreaField;
