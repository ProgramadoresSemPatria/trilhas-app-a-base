import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {

    const { logout } = useAuth()

    return (
        <header className="w-full h-20 flex bg-[#190639]">
            <nav className="w-full flex items-center justify-between px-4 sm:px-8 lg:px-16">
                <img 
                    src="/logo_horizontal_branco.webp" 
                    alt="Logo Borderless Coding" 
                    className="w-28"
                />
                <div>
                    <button 
                        type="button" 
                        onClick={() => logout()} 
                        className="text-white flex items-center cursor-pointer border border-slate-500 px-3 
                        py-[0.3rem] rounded-lg bg-[#00060f] hover:bg-[#28d3a0] transition-colors duration-200"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sair
                    </button>
                </div>
            </nav>
        </header>
    )
}
