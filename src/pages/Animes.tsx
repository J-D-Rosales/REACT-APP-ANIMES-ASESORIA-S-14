import {useEffect, useState} from "react";
import {api} from "../service/api";
import Navbar from "../components/Navbar";
import {Heart, Play, CheckCircle} from "lucide-react";

export interface Anime {
    id: number;
    title: string;
    image: string;
    status: string;
}

export default function Animes() {
    const [animes, setAnimes] = useState<Anime[]>([]);

    useEffect(() => {
        api.get('/anime/list')
            .then(response => setAnimes(response.data))
            .catch(error => console.error('Error fetching animes:', error));
    }, []);

    const toggleFavorite = async (animeId: number) => {
        try {
            await api.post(`/user/favorites`, { animeId });
            alert('Anime agregado a favoritos');
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const markProgress = async (animeId: number, status: "viendo" | "visto") => {
        try {
            await api.post(`/user/history`, { animeId, status });
            alert(`Anime marcado como ${status}`);
        }
        catch (error) {
            console.error('Error marking progress:', error);
        }
    };

    return(
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Lista de Animes Disponibles</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {animes.map(anime => (
                        <div key={anime.id} className="bg-white rounded shadow-md overflow-hidden">
                            <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    {anime.title}
                                </h3>
                                <div className="mt-4 flex justify-between items-center gap-2">
                                    <button onClick={() => toggleFavorite(anime.id)} className="flex items-center gap-1 text-red-500 hover:text-red-600 transition duration-300" title="Agregar a favoritos">
                                        <Heart size={18} />
                                    </button>
                                    <button onClick={() => markProgress(anime.id, "viendo")} className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition duration-300" title="Viendo">
                                        <Play size={18} />
                                    </button>
                                    <button onClick={() => markProgress(anime.id, "visto")} className="flex items-center gap-1 text-green-500 hover:text-green-600 transition duration-300" title="Visto">
                                        <CheckCircle size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>  
        </>
    );
}