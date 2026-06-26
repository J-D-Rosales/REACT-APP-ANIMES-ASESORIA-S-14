import { useState, useEffect } from "react";
import { api } from "../service/api";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react";

interface AnimeHistory{
    id: number;
    title: string;  
    image: string;
    status: string;
}

export default function History(){
    const [history, setHistory] = useState<AnimeHistory[]>([]);

    useEffect(() => {
        api.get('/anime/list').then(
            res => {
            const mockHistory = res.data.slice(0,3).map((anime: any, index: number) => ({
                ...anime,
                status: index === 0 ? "viendo" : "visto"
            }));
            setHistory(mockHistory);
        });
    },[]);

    const removeFromHistory = async (animeId: number) => {
        try{
            await api.delete(`/user/history`, {data: {animeId}});
            setHistory(history.filter(anime => anime.id !== animeId));
            alert('Anime eliminado del historial');
            console.log('Anime eliminado del historial:', animeId);
        }
        catch (error) {
            console.error('Error removing from history:', error);
            alert('Error al eliminar del historial. Inténtalo de nuevo.');
        }
    };

    return(
        <div className="bg-gray-950 min-h-screen p-6 text-white">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Tu Historial de Animes</h1>
                {history.length === 0 ? (
                    <p className="text-gray-400">No tienes historial de animes aún.</p>
                ) :(
                    <div className="flex flex-col gap-4">
                        {history.map(
                            anime => (
                                <div key={anime.id} className="bg-gray-800 rounded shadow-md overflow-hidden flex items-center gap-4 p-4">
                                    <div className="flex items-center gap-4">
                                    <img src={anime.image} alt={anime.title} className="w-24 h-24 object-cover rounded" />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{anime.title}</h3>
                                        <p className={`text-sm ${anime.status === "viendo" ? "text-red-400" : "text-green-400"}`}>
                                            {anime.status === "viendo" ? "Viendo" : "Visto"}
                                            Estado: {anime.status}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromHistory(anime.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                                    title="Eliminar del historial"
                                >
                                    <Trash2 size={18} /> ELIMINAR
                                </button>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
 