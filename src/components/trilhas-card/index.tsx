import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface TrackType {
    description: string;
    imageSrc?: string;
    slug: string
}

export default function TrilhasCard({ track }: { track: TrackType }) {

    const { user } = useAuth()
    const learningPathUrl = user?.learningPath === "Desenvolvimento" ? "/trilhas-desenvolvedor" : "/trilhas-dados"

    return (
        <Link
            to={`${learningPathUrl}/${track.slug}`} 
            className="relative w-[280px] overflow-hidden rounded-xl cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[#28d3a0]/10 hover:scale-105 border-[1px] border-[#150041]">
        <div className="relative h-[400px] w-full overflow-hidden">
            <img
            src={track.imageSrc || ""}
            alt={track.description}
            className="absolute inset-0 h-[400px] w-full object-cover rounded-xl"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-borderless-dark via-borderless-dark/80 to-transparent opacity-90" />

            <div className="absolute inset-0 bg-[url('/grid-overlay.png')] bg-cover opacity-30" />

            <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="mt-auto">

                <button
                onClick={() => {} }
                className="mt-2 flex items-center rounded-md px-3 py-1 text-accent-green hover:bg-accent-green/20 hover:text-accent-green"
                >
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="h-[2px] flex-grow bg-gradient-to-r from-accent-green/80 to-transparent ml-2"></div>
            </div>
            </div>
        </div>
        </Link>
    )
}