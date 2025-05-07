import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { cn } from "../../lib/utils"
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

export default function SignIn() {

    const [isAdmin, setIsAdmin] = useState(false); 
    const [buttonStatus, setButtonStatus] = useState<"Carregando..." | "Entrar">('Entrar');
    const [email, setEmail] = useState("");
    const { loginAsAdmin, loginAsStudent, isLoggedIn, user, loadingUser } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user?.role === "admin") {
          navigate("/painel");
        } 
        else if (isLoggedIn && user?.role === "student") {
            if(user.learningPath === "Desenvolvimento") {
              navigate("/trilhas-desenvolvedor");
            }
            else if (user.learningPath === "Dados") {
              navigate("/trilhas-dados");
            }
        }
      }, [navigate, isLoggedIn, user]);

      useEffect(() => {
        if (loadingUser) {
          setButtonStatus('Carregando...');
        } else {
          setButtonStatus('Entrar');
        }
      }, [loadingUser]);

    const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!email) return

      await loginAsStudent(email)
    }
    
    return (
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <img src="./logo_horizontal_branco.webp" alt="Logo Borderless Coding" className="w-40 mb-4" />

        <div className="w-full max-w-md rounded-lg bg-[#190639] p-6 shadow-lg">
            <div className="flex-1 flex gap-1 p-1 bg-[#1e293b] rounded-md">
                <button 
                    className={cn(
                    "w-full cursor-pointer", 
                    !isAdmin ? "bg-[#00060f] p-1 rounded-md text-white font-semibold" : "bg-transparent text-slate-300"
                    )}                
                    onClick={() => setIsAdmin(false)}
                    >
                    Estudante
                </button>
                <button 
                    className={cn(
                    "w-full cursor-pointer", 
                    isAdmin ? "bg-[#00060f] p-1 rounded-md text-white font-semibold" : "bg-transparent text-slate-300"
                    )}                 
                    onClick={() => setIsAdmin(true)}
                    >
                    Admin
                </button>
            </div>
            {!isAdmin && (
                <section className="h-[16rem]">
                    <div className="text-center pt-5">
                        <h2 className="text-2xl font-bold text-white mb-2">Login de Estudante</h2>
                        <p className="text-gray-400 text-sm">Acesse sua conta para visualizar suas trilhas de aprendizado</p>
                    </div>
                    <form onSubmit={handleEmailSignIn} className="mt-8 flex flex-col gap-2 text-white">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@email.com" 
                            className="p-2 bg-[#00060f] rounded-md"
                            />
                        <Button 
                            className="w-full mt-3" 
                            type="submit"
                            >
                            {buttonStatus}
                        </Button>
                    </form>
                </section>
            )}
            {isAdmin && (   
                <section className="h-[16rem] flex flex-col justify-center">
                    <div className="text-center pt-5">
                        <h2 className="text-2xl font-bold text-white mb-2">Login Administrativo</h2>
                        <p className="text-gray-400 text-sm">Acesso exclusivo para administradores da Borderless Coding</p>
                    </div>
                    <Button 
                        onClick={loginAsAdmin} 
                        className="w-full mt-8 flex items-center justify-center gap-2"
                        >
                        <img src="./google_icon.svg" className="h-5 w-5" />
                        Entrar com Google
                    </Button>
                </section> 
            )}
        </div>
      </main>
    )
  }
