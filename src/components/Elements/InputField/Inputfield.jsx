import React from "react";
import clsx from "clsx";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  error,
  touched,
  required = false,
  className = "", // Accept className as a prop
}) => {
  return (
    <div className={clsx("w-full", type === "radio" ? "flex flex-row items-center gap-2" : "flex flex-col", className)}>
      {/* Label */}
      <label className="text-left text-pink-600 text-2xl font-medium mb-1 w-full">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input Field */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={clsx(
          "w-full p-3 border rounded-lg bg-purple-50 text-gray-800 focus:outline-none focus:ring-2",
          error && touched ? "border-red-500 focus:ring-red-500" : "border-purple-400 focus:ring-purple-500",
          className // Apply the passed className here
        )}
      />

      {/* Error Message */}
      {error && touched && <p className="text-red-500 text-2xl flex justify-start mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
