export interface StudentType {
    name: string;
    email: string;
    userId: string;
    learningPath: string;
    sessionToken?: string;
    role: "student";
}

export interface UserType {
    userId: string;
    name: string;
    email: string;
    role: "admin" | "student";
    learningPath?: string;
}

export interface LearningPathType {
    slug: string
    title: string
    courses: CourseType[]
}

export interface CourseType {
    title: string
    modules: ModuleType[]
}

export interface ModuleType {
    title: string
    classes: ClassType[]
}

export interface ClassType {
    title: string
    link: string
}