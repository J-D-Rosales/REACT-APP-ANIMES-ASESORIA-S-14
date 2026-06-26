
import { useState, useEffect} from "react";
import { api } from "../service/api";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";

interface Anime{
    id: number;
    title: string;  
    image: string;
    status: string;
}

export default function Favorites(){
    const [favorites, setFavorites] = useState<Anime[]>([]);
    
    useEffect(() => {
        // SOlo traeremos los 4 primeros, 
        // porque el backend no tiene enpdoint de favoritos GET
        api.get('/anime/list').then(
            res => {
                setFavorites(res.data.slice(0, 4));
            }
        );
    },[]);

    const removeFavorite = async (animeId: number) => {
        try{
            await api.delete(`/user/favorites`, {data: {animeId}});
            setFavorites(favorites.filter(anime => anime.id !== animeId));
            alert('Anime eliminado de favoritos');
            console.log('Anime eliminado de favoritos:', animeId);
        }
        catch (error) {
            console.error('Error removing favorite:', error);
            alert('Error al eliminar de favoritos. Inténtalo de nuevo.');
        }
    };

    return(
        <div className="bg-gray-950 min-h-screen p-6 text-white">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Tus Animes Favoritos</h1>
                {favorites.length === 0 ? (
                    <p className="text-gray-400">No tienes animes favoritos aún.</p>
                ) :(
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {favorites.map(anime => (
                            <div key={anime.id} className="bg-gray-800 rounded shadow-md overflow-hidden">
                                <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{anime.title}</h3>
                                    <button 
                                        onClick={() => removeFavorite(anime.id)} 
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                                        >
                                        <Trash2 size={18} /> QUITAR
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );



}