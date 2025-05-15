import { browserLocalPersistence, setPersistence, signInAnonymously } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { auth } from "../../lib/firebase";
import ErrorToast from "../../components/toasts/error-toast";
import SuccessToast from "../../components/toasts/success-toast";

interface User {
    userId: string;
    email: string;
    learningPath: string;
    role: string;
    name: string;
}

export default async function SignInWithEmail(email: string) {
    let resultUser = null,
        error = null
    try {
       localStorage.setItem("userLoginMethod", "student");
       const dbRef = ref(getDatabase());
       const snapshot = await get(child(dbRef, 'students'));
       if(snapshot.exists()) {
           const users = snapshot.val();
           const userInfo = Object.values(users).find((user) => (user as User).email === email);
           
           if(userInfo) {
                await setPersistence(auth, browserLocalPersistence);
                const result = await signInAnonymously(auth);
                const uid = result?.user.uid;
                localStorage.setItem("sessionToken", uid ?? "");
                set(ref(getDatabase(), "students/" + (userInfo as User).userId + "/sessionToken"), uid);

                resultUser = userInfo;
                SuccessToast({ message: "Usuário logado com sucesso." });
            }
            else {
                resultUser = null;
                ErrorToast({ message: "Usuário não encontrado." });
                throw new Error("User not found");
            }
        }
        else {
            resultUser = null;
            ErrorToast({ message: "Usuário não encontrado." });
            throw new Error("User not found");
        }

    } catch (e) {
        error = e;
    }

    return { resultUser, error };
}  