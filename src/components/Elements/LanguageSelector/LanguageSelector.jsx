import React, {  useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const languages=[
    {code:'en',lang:'English'},
    {code:'fr',lang:'French'},
    {code:'hi',lang:'Hindi'},
]

const LanguageSelector = () => {
  const {i18n}=useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  
    
    const handleLanguage = (lang) => {
      if (lang !== i18n.language) {
        i18n.changeLanguage(lang); // Change language only if it is different
        setSelectedLang(lang); // Update the state to the selected language
      }
    };
  
    // This useEffect ensures the component will react to the language change
    useEffect(() => {
      setSelectedLang(i18n.language); // Update the state when i18n language changes externally (e.g., from other parts of the app)
    }, [i18n.language]);

  return (
    <div className="relative w-48">
    <select
      value={selectedLang}
      onChange={(e) => handleLanguage(e.target.value)}
      className="min-w-[116px] h-[36px] px-8 py-2 text-gray-700 bg-white border border-purple-400 rounded-lg shadow-md 
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none
      hover:bg-purple-100 cursor-pointer"
    >
      {languages.map((lng) => (
        <option key={lng.code} value={lng.code} className='hover:bg-purple-300'>
          {lng.lang}
        </option>
      ))}
    </select>
    
    {/* Dropdown Arrow */}
    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
      ▼
    </div>
  </div>
  
  )
}

export default LanguageSelector
