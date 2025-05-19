import { get, getDatabase, ref, remove } from "firebase/database";

export default async function removeStudent(studentId: string) {
    const dbRef = ref(getDatabase(), "students/" + studentId);
    try {
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) {
            throw new Error("Student not found");
        }
        await remove(dbRef);
        return 200;
    } catch (e) {
        console.log(e);
        return 500;
    }
}