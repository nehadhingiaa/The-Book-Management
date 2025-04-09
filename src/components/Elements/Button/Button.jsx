import React from "react";
import clsx from "clsx"; // Install with `npm install clsx` or `yarn add clsx`

const Button = ({ children, onClick, className = "", disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                `bg-pink-400 text-white text-md px-3 py-2 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed
                flex justify-center items-center transition duration-300 ease-in-out w-[100px] h-[36px] rounded-lg`, // Set width < 120px
                className 
            )}
        >
            {children}
        </button>
    );
};

export default Button;
