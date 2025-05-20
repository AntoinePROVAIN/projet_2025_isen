
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import "../assets/css/Header.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Bouton";

import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    
    const { t, i18n } = useTranslation();
    const nav = useNavigate();

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [userType, setUserType] = useState("");
    
    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if(localToken) setToken(localToken);
        
        const localUserId = localStorage.getItem("userId");
        if (localUserId) setUserId(localUserId);

        const localUserType = localStorage.getItem('userType');
        if (localUserType) setUserType(localUserType);
        
    }, [])

    useEffect(() => {
        if(token && userId && userType){
            setIsConnected(true);
            console.log("connecté : "+isConnected);
        }else{
            console.log("pas connecté : "+isConnected); 
        }
    }, [token, userId, userType]);


    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    

    return (
        <header className="relative sticky top-0 z-45">
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
                {!isConnected ? (
                    <>
                        <nav className="py-10 px-16">
                            <div className="px-4">
                                <ul className="space-y-10">
                                <li>
                                    <a href="/#description_speech" onClick={() => { toggleMenu(); }} className="block px-2 py-1">{t('whoami')}</a>
                                </li>
                                <li className="li-hidden">
                                    <a href="/" className="block px-2 py-1">{t('opinion')}</a>
                                </li>
                                <li className="li-hidden">
                                    <a href="/" className="block px-2 py-1">{t('faq')}</a>
                                </li>
                                </ul>
                            </div>
                        </nav>
                        <span className="my-10"></span>
                        <span className="my-10"></span>
                        <div className="space-y-10 py-10 px-16 flex flex-col justify-center">
                            <Button onClick={()=>{
                                    toggleMenu();
                                    nav("/connection/student");
                                }} children={t('student')} />
                            <Button onClick={()=>{
                                    toggleMenu();
                                    nav("/connection/entreprise");
                                }} children={t('startup')} />
                        </div>
                    </>) : (
                        <>
                            <div className="py-10 px-16 space-y-6">
                                <a href="/dashboard" className="block px-2 py-1">
                                    {t('myOffer')}
                                </a>
                                <a href="/profil" className="block px-2 py-1">
                                    {t('profil')}
                                </a>
                            </div>
                            <span className="my-10"></span>
                            <span className="my-10"></span>
                            <div className="space-y-10 py-10 px-16 flex flex-col justify-center">
                                <Button onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("userId");
                                    localStorage.removeItem("userType");
                                    setIsConnected(false);
                                    toggleMenu();
                                    nav('/');
                                }} children={t('logout')}
                                className=""/>
                            </div>
                        </>
                    )}

            </div>
            {/* )} */}
        </header>
    );
};

export default Header;

