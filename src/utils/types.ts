export interface StudentType {
    name: string;
    email: string;
    userId: string;
    learningPath: string;
}

export interface UserType {
    userId: string;
    name: string;
    email: string;
    role: "admin" | "student";
  }