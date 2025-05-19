
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import "../assets/css/Header.css";
import { useState, useEffect } from "react";
import Button from "./Bouton";


export default function Header() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="relative">
            <div className="container mx-auto px-4 py-3 flex flex-row ">
                <button
                    onClick={toggleMenu}
                    className="mr-4 z-50 relative" 
                    aria-label="Menu">
                    {!isMenuOpen ? <Menu size={24} /> : <X size={24}/>}
                    
                </button>
                <h1 className="text-4xl">SalesTraction</h1>
                <div className="w-8"></div>
            </div>
            {/* {isMenuOpen && ( */}
                <div className={`fixed bg-white left-0 top-32 w-full lg:w-80 h-screen flex flex-col z-40 transform transition-transform duration-300 ease-in-out 
                ${ isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <nav className="py-10 px-16">
                        <div className="px-4">
                            <ul className="space-y-10">
                            <li>
                                <a href="#" className="block px-2 py-1">Qui sommes nous ?</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1">Avis</a>
                            </li>
                            <li>
                                <a href="#" className="block px-2 py-1">FAQ</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    <span className="my-10"></span>
                    <span className="my-10"></span>
                    <div className="space-y-10 py-10 px-16 flex flex-col justify-center">
                        <Button onClick={()=>console.log('Etudiant')} children='Je suis un étudiant' />
                        <Button onClick={()=>console.log('Startup')} children='Je suis une startup' />
                    
                    </div>
                </div>
            
            {/* )} */}
        </header>
    );
};
