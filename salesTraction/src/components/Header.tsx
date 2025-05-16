
import { Menu } from "lucide-react";
import "../assets/css/Header.css";


export default function Header() {
    
    return (
        <header>
            <div className="container mx-auto px-4 py-3">
                <button
                    onClick={()=>{console.log("header menu")}}
                    className=""
                    aria-label="Menu">
                    <Menu size={24} />
                </button>
                <h1 className="text-4xl">SalesTraction</h1>
                <div className="w-8"></div>
            </div>
        </header>
    );
};
