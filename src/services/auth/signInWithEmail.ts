import { child, get, getDatabase, ref } from "firebase/database";

interface User {
    userId: string;
    email: string;
    learningPath: string;
    role: string;
}

export default async function SignInWithEmail(email: string) {
    let resultUser = null,
        error = null;
    try {
       const dbRef = ref(getDatabase());
       const snapshot = await get(child(dbRef, 'users'));

        if(snapshot.exists()) {
            const users = snapshot.val();
            const userInfo = Object.values(users).find((user) => (user as User).email === email);

            if(userInfo) {
                resultUser = userInfo;
            }
            else {
                resultUser = null;
                throw new Error("User not found");
            }
        }
        else {
            resultUser = null;
            throw new Error("User not found");
        }

    } catch (e) {
        error = e;
    }

    return { resultUser, error };
}  