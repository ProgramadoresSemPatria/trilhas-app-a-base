import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default async function SignInWithGoogle() {
  let result = null,
      error = null;
  try {
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
    /* const email = result.user.email;
    if (!email?.endsWith("@borderlesscoding.com")) {
      result = null;
      throw new Error("Access denied. You must be a member of @borderlesscoding.com");
    } */
  } catch (e) {
    error = e;
  }

  return { result, error };
}