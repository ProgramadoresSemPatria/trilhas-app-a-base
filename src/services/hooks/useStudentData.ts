import { useQuery } from "@tanstack/react-query";
import { getDatabase, ref, get } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import { StudentType } from "../../utils/types";

const useStudentData = () => {
  const { user } = useAuth();

  const fetchData = async (): Promise<StudentType[]> => {
    const db = getDatabase();
    const userRef = ref(db, 'students/');
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const dbData = snapshot.val();
      return Object.values(dbData) as StudentType[];
    }
    throw new Error("Student data not found");
  };

  return useQuery({
    queryKey: ["studentData"],
    queryFn: fetchData,
    /* TODO: Add user === admin check */
    enabled: user?.role === "student",
  });
};

export default useStudentData;