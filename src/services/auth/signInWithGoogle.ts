import ErrorToast from '../../components/toasts/error-toast';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function SignInWithGoogle() {
  let result = null,
      error = null;
  try {
    localStorage.setItem("userLoginMethod", "admin");
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
    if(result) { /* TODO: @borderlesscoding.com */
      /* const email = result.user.email;
      if (!email?.endsWith("@borderlesscoding.com")) {
        result = null;
        ErrorToast({ message: "Access denied." });
        throw new Error("Access denied. You must be a member of @borderlesscoding.com");
      } */
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