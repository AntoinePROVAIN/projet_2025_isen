
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import "../assets/css/Header.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Bouton";


const Header: React.FC = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="relative">
            <div className="mx-auto px-4 py-3 flex flex-row ">
                <button
                    onClick={toggleMenu}
                    className="mr-4 z-50 relative" 
                    aria-label="Menu">
                    {!isMenuOpen ? <Menu size={24} /> : <X size={24}/>}
                    
                </button>
                <h1 className="text-4xl">{t('SalesTraction')}</h1>
                <div className="w-8"></div>
            </div>
            {/* {isMenuOpen && ( */}
                <div className={`fixed bg-white left-0 top-32 w-full lg:w-80 h-screen flex flex-col z-40 transform transition-transform duration-300 ease-in-out 
                ${ isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <nav className="py-10 px-16">
                        <div className="px-4">
                            <ul className="space-y-10">
                            <li>
                                <a href="#" className="block px-2 py-1">{t('whoami')}</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1">{t('opinion')}</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1">{t('faq')}</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    <span className="my-10"></span>
                    <span className="my-10"></span>
                    <div className="space-y-10 py-10 px-16 flex flex-col justify-center">
                        <Button onClick={()=>console.log('Etudiant')} children={t('student')} />
                        <Button onClick={()=>console.log('Startup')} children={t('startup')} />
                    
                    </div>
                </div>
            
            {/* )} */}
        </header>
    );
};

export default Header;
