import { Link, useParams } from "react-router-dom";
import { learningPathsData } from "../../constants/conteudos-aulas";
import { CircleArrowLeft } from "lucide-react";
import Header from "../../components/header";
import { useAuth } from "../../context/AuthContext";
import { LearningPathType } from "../../utils/types";
import { LearningPathCard } from "../../components/learning-path-card";
import { useEffect } from "react";

export default function Aulas() {

    const { user } = useAuth()
    const { slug } = useParams();
    const learningPath = learningPathsData.find((trilha) => trilha.slug === slug) as LearningPathType

    const goBackUrl = user?.learningPath === "Desenvolvimento" ? "/trilhas-desenvolvedor" : "/trilhas-dados"

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <>
            <Header />
            <main className="w-full h-full max-w-[96rem] mx-auto text-white p-5 sm:p-8 lg:p-12">
                <Link 
                    to={goBackUrl}
                    className="w-fit pb-5 sm:mt-5 flex items-center text-[#28d3a0] hover:text-[#28d3a0]/80 transition-colors text-xl font-medium"
                >   
                    <CircleArrowLeft className="h-5 w-5 mr-2" />
                    Voltar
                </Link>
                <LearningPathCard learningPath={learningPath}/>
            </main>
        </>
    )
}
