import ErrorToast from '../../components/toasts/error-toast';
import { auth } from '../../lib/firebase';
import { browserLocalPersistence, GoogleAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";

export default async function SignInWithGoogle() {
  let result = null,
      error = null;
  try {
    localStorage.setItem("userLoginMethod", "admin");
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
    if(result) { 
      const email = result.user.email;
      if (!email?.endsWith("@borderlesscoding.com")) {
        result = null;
        ErrorToast({ message: "Access denied." });
        throw new Error("Access denied. You must be a member of @borderlesscoding.com");
      } 
    }
    else {
      result = null;
      ErrorToast({ message: "Access denied." });
      throw new Error("Access denied.");
    }

  } catch (e) {
    error = e;
  }

  return { result, error };
}