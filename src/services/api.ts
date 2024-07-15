// import { Course } from "../types/course";

// const API_URL = "http://localhost:3001";

// export const fetchCourses = async (): Promise<Course[]> => {
//   try {
//     const response = await fetch(`${API_URL}/api/courses`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch courses");
//     }

//     const data = await response.json();
//     return data as Course[];
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     throw error; 
//   }
// };
