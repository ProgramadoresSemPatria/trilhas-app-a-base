/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import SignInWithGoogle from "../services/auth/signInWithGoogle";
import SignInWithEmail from "../services/auth/signInWithEmail";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserType } from "../utils/types";
import ErrorToast from "../components/toasts/error-toast";

export interface AuthContextType {
  user: UserType | null;
  loginAsAdmin: () => Promise<void>;
  loginAsStudent: (email: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const userLoginFlag = localStorage.getItem("userLoginMethod");
    
    const onAuthStateChanged = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email ?? "";
        const isAdmin = email.endsWith(".com"); // TODO: @borderlesscoding.com
        if ((isAdmin && userLoginFlag === "admin") || 
            (!isAdmin && userLoginFlag === "student")) {
          setUser({
            userId: firebaseUser.uid,
            name: firebaseUser.displayName ?? "",
            email: email,
            role: isAdmin ? "admin" : "student",
          });
        } else if (userLoginFlag) {
          console.error("User role doesn't match login method");
          signOut(auth);
          localStorage.removeItem("userLoginMethod");
        }
      } else {
        setUser(null);
        localStorage.removeItem("userLoginMethod");
      }
    });

    return () => onAuthStateChanged();
  }, []);

  const loginAsAdmin = async () => {
    localStorage.setItem("userLoginMethod", "admin");
    const { result, error } = await SignInWithGoogle();
    
    if (result) {
      const email = result.user.email ?? ""; 
      if (!email.endsWith(".com")) { // TODO: @borderlesscoding.com
        ErrorToast({ message: "Access denied." });
        await signOut(auth);
        localStorage.removeItem("userLoginMethod");
        throw new Error("This account is not authorized as admin");
      }
      
      setUser({
        userId: result.user.uid,
        name: result.user.displayName ?? "",
        email: email,
        role: "admin",
      });
    } else {
      localStorage.removeItem("userLoginMethod");
      throw new Error(error as string);
    }
  };

  const loginAsStudent = async (email: string) => {
    localStorage.setItem("userLoginMethod", "student");
    const { resultUser, error } = await SignInWithEmail(email);
    
    if (resultUser) {
      const user = resultUser as UserType;
      
      if (user.role !== "student") {
        localStorage.removeItem("userLoginMethod");
        throw new Error("User is not a student");
      }
      
      setUser({
        userId: user.userId,
        name: user.name,
        email: user.email ?? "",
        role: "student",
      });
    } else {
      localStorage.removeItem("userLoginMethod");
      throw new Error((error as { message?: string })?.message || "Failed to log in");
    }
  };

  const logout = async () => {
    localStorage.removeItem("userLoginMethod");
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsStudent, logout, isLoggedIn }}>
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