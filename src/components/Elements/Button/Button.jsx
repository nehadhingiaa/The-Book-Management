import React from "react";

const Button = ({ children, onClick, className = "", disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg font-medium text-white bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed 
            sm:px-5 sm:py-3 sm:text-base 
            // md:px-6 md:py-3 md:text-lg 
            // lg:px-8 lg:py-4 lg:text-xl
            ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;

