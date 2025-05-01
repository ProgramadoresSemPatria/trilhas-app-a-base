import { getDatabase, push, ref, set } from "firebase/database";
import { StudentType } from "../utils/types";

export default async function saveStudent(student: StudentType) {

    const dbRef = ref(getDatabase(), "students/");
    const studentKey = push(dbRef).key;

    student.userId = studentKey;
    const studentRouteRef = ref(getDatabase(), "students/" + studentKey);

    try {
        await set(studentRouteRef, student);
        return 201;
    } catch (e) {
        console.log(e);
        return 500;
    }
}