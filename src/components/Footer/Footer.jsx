import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="fixed bottom-0 left-0 md:left-[250px] right-0 bg-gradient-to-r from-pink-100 via-purple-200 to-purple-100 h-[50px] flex items-center justify-between px-6 shadow-purple-300">
        <div className="text-gray-700 font-semibold">Book Fair App</div>
        {/* <ul className="flex space-x-4 sm:space-x-6 text-black gap-3">
          <li className="hover:text-blue-500 cursor-pointer">Google</li>
          <li className="hover:text-blue-500 cursor-pointer">Facebook</li>
          <li className="hover:text-blue-500 cursor-pointer">YouTube</li>
        </ul> */}
      </footer>
    </div>
  );
};

export default Footer;
