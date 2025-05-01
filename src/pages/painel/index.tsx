import { useEffect, useState } from "react"
import Header from "../../components/header"
import Button from "../../components/button"
import useStudentData from "../../services/hooks/useStudentData"
import { StudentType } from "../../utils/types"
import { AddStudentModal } from "../../components/add-student-modal"

export default function Painel() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isStudentSaved, setIsStudentSaved] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<StudentType>({ 
        name: "", 
        email: "", 
        learningPath: "",
        userId: "" 
    }) 
    const { data: studentsData, isLoading, error, refetch } = useStudentData();

    useEffect(() => {
        const handleRefetch = async () => {
            try {
              await refetch();
              setIsStudentSaved(false);
              setIsModalOpen(false); 
            } catch (e) {
              console.error("Error refetching data:", e);
            }
        };
        handleRefetch();
    }, [isStudentSaved, refetch])

    const handleAddStudent = () => {
        setIsModalOpen(true)
    }
    const handleEditStudent = (student: StudentType) => {
        setSelectedStudent(student)
        setIsModalOpen(true)
    }

    
    return (
      <>
        <Header/>
        <main className="w-full h-screen max-w-[96rem] mx-auto text-white p-5 sm:p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Painel Administrativo</h1>
                <Button 
                    onClick={() => handleAddStudent()}
                    className="w-40 mt-[.6rem]"
                    >
                    Adicionar Aluno
                </Button>
            </div>
            <div className="w-full h-fit mt-8 rounded-md p-5 bg-[#190639]">
                <table className="w-full border-collapse p-10 bg-[#190639] rounded-md overflow-x-scroll">
                    <thead className="bg-transparent">
                        <tr className="border-b border-slate-700">
                            <th className="px-4 py-3 text-left text-gray-400">Nome</th>
                            <th className="px-4 py-3 text-left text-gray-400">Email</th>
                            <th className="px-4 py-3 text-left text-gray-400">Trilha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={3} className="text-white p-3">Carregando...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan={3} className="text-white p-3">Nenhum aluno encontrado</td>
                            </tr>
                        )}
                        {!isLoading && !error && studentsData && studentsData?.length > 0 && studentsData.map((student: StudentType) => (
                            <tr 
                                className="border-b border-slate-700 cursor-pointer hover:*:bg-[#28d3a0]/10 transition-colors duration-200" 
                                key={student.name} 
                                onClick={() => handleEditStudent(student)}
                                >
                                <td className="px-4 py-3 text-white">{student.name}</td>
                                <td className="px-4 py-3 text-white">{student.email}</td>
                                <td className="px-4 py-3">
                                    <span className={`py-1 px-4 rounded-full border 
                                        ${
                                            student.learningPath === "Desenvolvimento"
                                            ? "bg-[#6c21ed]/20 text-[#995eff] border-[#995eff]/30"
                                            : "bg-[#28d3a0]/20 text-[#28d3a0] border-[#28d3a0]/30"
                                        }
                                    `}>{student.learningPath}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && 
                <AddStudentModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    setSelectedStudent={setSelectedStudent}
                    selectedStudent={selectedStudent}
                    setIsStudentSaved={setIsStudentSaved}
                />
            }
        </main>
      </>
    )
  }