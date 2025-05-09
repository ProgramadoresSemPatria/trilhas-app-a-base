/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import SignInWithGoogle from "../services/auth/signInWithGoogle";
import SignInWithEmail from "../services/auth/signInWithEmail";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { StudentType, UserType } from "../utils/types";
import ErrorToast from "../components/toasts/error-toast";
import { get, getDatabase, ref } from "firebase/database";

export interface AuthContextType {
  user: UserType | null;
  loginAsAdmin: () => Promise<void>;
  loginAsStudent: (email: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  loadingUser: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const isLoggedIn = !!user;

  useEffect(() => {
    const userLoginFlag = localStorage.getItem("userLoginMethod");
    const onAuthStateChanged = auth.onAuthStateChanged( async(firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email ?? "";
        const isAdmin = email.endsWith("@borderlesscoding.com"); // TODO: @borderlesscoding.com
        if ((isAdmin && userLoginFlag === "admin") || (!isAdmin && userLoginFlag === "student")) {
          if(isAdmin) {
            setUser({
              userId: firebaseUser.uid,
              name: firebaseUser.displayName ?? "",
              email: email,
              role: "admin",
            });
          }
          else {
            const sessionId = localStorage.getItem("sessionToken");
            let userDB: StudentType | null = null;
            if (sessionId) {
              const snapshot = await get(ref(getDatabase(), "students/"));
              userDB = Object.values(snapshot.val())
                .find((user) => (user as StudentType).sessionToken === sessionId) as StudentType;
            }

            setUser({
              userId: userDB?.userId ?? firebaseUser.uid,
              name: userDB?.name ?? "",
              email: userDB?.email ?? email,
              role: "student",
              learningPath: userDB?.learningPath ?? "",
            });
          }
        } 
        else if (userLoginFlag) {
          console.error("User role doesn't match login method");
          signOut(auth);
          localStorage.removeItem("userLoginMethod");
          localStorage.removeItem("sessionToken");
        }
      } else {
        setUser(null);
        localStorage.removeItem("userLoginMethod");
        localStorage.removeItem("sessionToken");
      }
    });

    return () => onAuthStateChanged();
  }, []);

  const loginAsAdmin = async () => {
    localStorage.setItem("userLoginMethod", "admin");
    const { result, error } = await SignInWithGoogle();
    
    if (result) {
      const email = result.user.email ?? ""; 
      if (!email.endsWith("@borderlesscoding.com")) { // TODO: @borderlesscoding.com
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
    setLoadingUser(true);
    const { resultUser, error } = await SignInWithEmail(email);

    if (resultUser) {
      const user = resultUser as UserType;
      
      setUser({
        userId: user.userId,
        name: user.name,
        email: user.email ?? "",
        role: "student",
        learningPath: user.learningPath ?? "",
      });
      setLoadingUser(false);
    } else {
      setLoadingUser(false);
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
    <AuthContext.Provider value={{ loadingUser, user, loginAsAdmin, loginAsStudent, logout, isLoggedIn }}>
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