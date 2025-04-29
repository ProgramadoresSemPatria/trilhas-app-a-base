/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";
import SignInWithGoogle from "../services/auth/signInWithGoogle";
import SignInWithEmail from "../services/auth/signInWithEmail";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";


interface User {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "student";
}

export interface AuthContextType {
  user: User | null;
  loginAsAdmin: () => Promise<void>;
  loginAsStudent: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const loginAsAdmin = async () => {
    const { result, error } = await SignInWithGoogle();
    if (result) {
      setUser({
        userId: result.user.uid,
        name: result.user.displayName ?? "",
        email: result.user.email ?? "",
        role: "admin",
      });
    } else {
      throw new Error(error as string);
    }
  };

  const loginAsStudent = async (email: string) => {
    const { resultUser, error } = await SignInWithEmail(email);
    if (resultUser) {
      const user = resultUser as User; 
      if (user.role !== "student") {
        throw new Error("User is not a student");
      }
      setUser({
        userId: user.userId,
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role,
      });
    } else {
      throw new Error((error as { message?: string })?.message || "Failed to log in");
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};