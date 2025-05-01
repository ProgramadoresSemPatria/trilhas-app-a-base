import { useRef, useEffect } from "react"
import { StudentType } from "../../utils/types"
import Button from "../button"
import useStudentMoal from "../../custom-hooks/useStudentModal"

interface AddStudentModalProps {
  isOpen: boolean
  onClose: () => void
  setSelectedStudent: (student: StudentType) => void
  selectedStudent: StudentType
  setIsStudentSaved: (state: boolean) => void
}

export function AddStudentModal({ 
  isOpen, 
  onClose, 
  setSelectedStudent, 
  selectedStudent, 
  setIsStudentSaved 
}: AddStudentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  
  const {
    name,
    setName,
    email,
    setEmail,
    learningPath,
    setLearningPath,
    errors,
    handleSubmit,
    handleRemoveStudent,
    handleClose,
    isEditing
  } = useStudentMoal({
    selectedStudent,
    setSelectedStudent,
    setIsStudentSaved,
    onClose
  })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!isOpen) return null

  const modalTitle = isEditing ? "Editar Aluno" : "Adicionar Novo Aluno"
  const buttonText = isEditing ? "Salvar" : "Adicionar"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black opacity-40 transition-opacity" 
        onClick={handleClose}
      />
      
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-md rounded-lg bg-[#190639] p-6 shadow-lg border border-gray-700 text-white"
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold">{modalTitle}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-md bg-[#00060f] border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">Nome é obrigatório</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md bg-[#00060f] border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email inválido</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="learningPath" className="block text-sm font-medium">
              Trilha de Aprendizado
            </label>
            <select
              id="learningPath"
              required
              value={learningPath}
              onChange={(e) => setLearningPath(e.target.value)}
              className={`w-full rounded-md bg-[#00060f] border ${
                errors.learningPath ? "border-red-500" : "border-gray-600"
              } py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none`}
            >
              <option value="" disabled>Selecione uma trilha</option>
              <option value="Desenvolvimento">Desenvolvimento</option>
              <option value="Dados">Dados</option>
            </select>
            {errors.learningPath && (
              <p className="text-red-500 text-xs mt-1">Trilha de aprendizado é obrigatória</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-transparent rounded-md border border-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </Button>
            {isEditing && (
              <Button
                type="button"
                onClick={handleRemoveStudent}
                className="px-4 py-2 rounded-md bg-[#28d3a0]/80 text-white hover:bg-[#28d3a0]/90 focus:outline-none focus:ring-2 focus:ring-[#28d3a0]"
              >
                Remover
              </Button>
            )}
            <Button
              type="submit"
              className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}