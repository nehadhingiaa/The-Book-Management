import React, { useState } from 'react';
import Login from '../Login/Login'
import LanguageSelector from '../Elements/LanguageSelector/LanguageSelector';
import Button from '../Elements/Button/Button';
import { Translation, useTranslation } from 'react-i18next';
// import {ReactComponent as Booklogo} from '../../assets/images/bookLogo.jpg'

const Navbar = () => {
  const {t}=useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen,setIsModalOpen] =useState(false)
  const showModal=()=>{
    setIsModalOpen(true)
  }
  const closeModal=()=>{
    setIsModalOpen(false)
  }

  return (
    <>
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto min-h-30 flex justify-between items-center auto">
        {/* Icon Section */}
        <div className="text-white text-2xl font-bold">
          {/* <Booklogo/>This is just an example icon, you can change it */}
          <span className='font-semibold text-black text-5xl'><span >📚 </span>{t("homePageHeader")}</span>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden gap-5 md:flex space-x-8">
         
          {/* <a href="#" className="text-black font-bold" onClick={showModal}> </a> */}
          <Button onClick={showModal}>{t("login")}</Button>

          <LanguageSelector/>

        </div>

    
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <i className="fas fa-bars"></i> {/* Icon for mobile menu */}
          </button>
        </div>
      </div>

     
     
    </nav>
   {isModalOpen &&  <Login showModal={showModal} closeModal={closeModal}/>}
    </>
  );
};

export default Navbar;

