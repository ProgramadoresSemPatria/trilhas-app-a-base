import { get, getDatabase, push, ref, set } from "firebase/database";
import { StudentType } from "../utils/types";
import ErrorToast from "../components/toasts/error-toast";

export default async function saveStudent(student: StudentType) {

    const dbRef = ref(getDatabase(), "students/");
    const studentKey = push(dbRef).key;

    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        const students = snapshot.val();

        const emailExists = Object.values(students).some(
            (studentFromDB) => (studentFromDB as StudentType).email === student.email
        );
        
      if (emailExists) {
        ErrorToast({ message: "Já existe um aluno com esse email." });
        return 409;
      }
    }

    student.userId = studentKey;
    const studentRouteRef = ref(getDatabase(), "students/" + studentKey);

    try {
        await set(studentRouteRef, student);
        return 201;
    } catch (e) {
        console.error('Error saving student:', e);
        return 500;
    }
}