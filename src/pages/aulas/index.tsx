import { Link, useParams } from "react-router-dom";
import { learningPathsData } from "../../constants/conteudos-aulas";
import { CircleArrowLeft } from "lucide-react";
import Header from "../../components/header";
import { useAuth } from "../../context/AuthContext";
import { CourseType, LearningPathType } from "../../utils/types";
import { LearningPathCard } from "../../components/learning-path-card";
import { useEffect, useState } from "react";

export default function Aulas() {

    const { user } = useAuth()
    const { slug } = useParams();
    const [classesTaken, setClassesTaken] = useState<string[]>([])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const storedClassesTaken = localStorage.getItem("classes-taken-storage")
        if (storedClassesTaken) {
            setClassesTaken(JSON.parse(storedClassesTaken))
        }
    }, [])

    const goBackUrl = user?.learningPath === "Desenvolvimento" ? "/trilhas-desenvolvedor" : "/trilhas-dados";

    
    const learningPath = learningPathsData.find((trilha) => trilha.slug === slug) as LearningPathType;
    const amountOfClasses = learningPath.courses.reduce((courseAcc, course) => {
        const classesInCourse = course.modules.reduce((moduleAcc, module) => {
            const classesInModule = module.classes.length;
            return moduleAcc + classesInModule;
        }, 0);
        
        return courseAcc + classesInCourse;
    }, 0);
    const amountOfClassesTaken = learningPath.courses.reduce((courseAcc: number, course: CourseType) => {
        const classesInCourse = course.modules.reduce((moduleAcc: number, module) => {
            const classesInModule = module.classes.filter((classe) => classesTaken.includes(classe.classId)).length;
            return moduleAcc + classesInModule;
        }, 0);
        
        return courseAcc + classesInCourse;
    }, 0);
    const learningPathProgressPorcentage = (amountOfClassesTaken / amountOfClasses) * 100;

    return (
        <>
            <Header />
            <main className="w-full h-full max-w-[96rem] mx-auto text-white p-5 sm:p-8 lg:p-12">
                <div className="w-full flex items-center justify-between">
                    <Link
                        to={goBackUrl}
                        className="w-fit pb-5 sm:mt-5 flex items-center text-[#28d3a0] hover:text-[#28d3a0]/80 transition-colors text-xl font-medium"
                    >
                        <CircleArrowLeft className="h-5 w-5 mr-2" />
                        Voltar
                    </Link>
                </div>
                <LearningPathCard 
                    learningPath={learningPath} 
                    classesTaken={classesTaken} 
                    setClassesTaken={setClassesTaken}
                    progress={learningPathProgressPorcentage}
                    />
            </main>
        </>
    )
}
