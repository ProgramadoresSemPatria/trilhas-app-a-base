import { get, getDatabase, ref, update } from "firebase/database";
import { StudentType } from "../utils/types";

export default async function updateStudent(student: StudentType) {
    const dbRef = ref(getDatabase(), "students/" + student.userId);
    try {
        const snapshot = await get(dbRef);
        if (!snapshot.exists()) {
            throw new Error("Student not found");
        }
        await update(dbRef, student);
        return 201;
    } catch (e) {
        console.log(e);
        return 500;
    }
}