import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {PlaySquare, Heart, Clock, LogOut} from "lucide-react";

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/animes" className="flex items-center gap-2 text-xl font-bold hover:text-gray-300 transition duration-300">
                    <PlaySquare/> SparkyRoll
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/animes" className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                    Animes
                    </Link>
                    <Link to="/favorites" className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                        <Heart size={20}/> Favoritos
                    </Link>
                    <Link to="/history" className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                        <Clock size={20}/> Historial
                    </Link>
                    <button onClick={logout} className="flex items-center gap-1 hover:text-gray-300 transition duration-300">
                        <LogOut size={20}/> Salir
                    </button>
                </div>
            </div>
        </nav>
    );


}