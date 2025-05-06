import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { LearningPathType } from "../../utils/types"

type LearningPathCardProps = {
    learningPath: LearningPathType
}

export function LearningPathCard({ learningPath }: LearningPathCardProps) {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  const toggleCourse = (courseIndex: number) => {
    if (expandedCourse === courseIndex) {
      setExpandedCourse(null)
      setExpandedModule(null)
    } else {
      setExpandedCourse(courseIndex)
      setExpandedModule(null)
    }
  }

  const toggleModule = (moduleIndex: number) => {
    if (expandedModule === moduleIndex) {
      setExpandedModule(null)
    } else {
      setExpandedModule(moduleIndex)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl shadow-lg mb-10">
      <div className="py-6 pb-4">
        <h1 className="mb-4 font-mono text-2xl font-bold uppercase tracking-wider text-white">
          {learningPath.title}
        </h1>
        
        <div className="h-[2px] w-full bg-gradient-to-r from-[#28d3a0] to-[#4F46E5]"></div>
      </div>
  
      <div className="py-6 pb-6">
        <ul className="space-y-4">
          {learningPath.courses.map((course, courseIndex) => (
            <li key={courseIndex} className="overflow-hidden rounded-lg bg-[#18063a] ease-linear cursor-pointer">
              <button
                onClick={() => toggleCourse(courseIndex)}
                className="flex w-full items-center justify-between p-4 text-left font-mono text-white hover:bg-[#18063a]/80 cursor-pointer"
              >
                <span className="font-medium">{course.title}</span>
                {expandedCourse === courseIndex ? (
                  <ChevronUp className="h-5 w-5 text-[#28d3a0]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#28d3a0]" />
                )}
              </button>
  
              {expandedCourse === courseIndex && (
                <div className="border-t border-[#4F46E5]/20">
                  <ul className="divide-y divide-[#4f46f3]/30">
                    {course.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex} className="cursor-pointer">
                        <button
                          onClick={() => toggleModule(moduleIndex)}
                          className="flex w-full items-center justify-between p-3 px-4 text-left text-sm font-mono bg-[#4F46E5]/15 text-white hover:bg-[#4F46E5]/40 cursor-pointer"
                        >
                          <span>{module.title}</span>
                          {expandedModule === moduleIndex ? (
                            <ChevronUp className="h-4 w-4 text-[#28d3a0]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#28d3a0]" />
                          )}
                        </button>
  
                        {expandedModule === moduleIndex && (
                          <ul className="divide-y divide-[#4F46E5]/10 bg-[#0c0625] px-2 py-2">
                            {module.classes.map((classItem, classIndex) => (
                              <li key={classIndex} className="rounded-md p-2 hover:bg-[#4F46E5]/10 transition-colors">
                                <a
                                  href={classItem.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between text-sm text-[#28d3a0] hover:text-white transition-colors"
                                >
                                  <span className="font-mono ">{classItem.title}</span>
                                  <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}