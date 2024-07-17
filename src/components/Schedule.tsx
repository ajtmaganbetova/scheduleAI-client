// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import DayColumn from "./DayColumn";
// import { ScheduleProps } from "../types/course";

// const Schedule: React.FC = () => {
//   const [schedule, setSchedule] = useState<ScheduleProps | null>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchSchedule = async (courseAbbr: string, semester: string) => {
//     try {
//       const response = await axios.post("http://localhost:3001/api/courses", {
//         courseAbbr,
//         semester,
//       });
//       setSchedule(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching schedule:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const courseAbbr = localStorage.getItem("courseAbbr");
//     const semester = localStorage.getItem("semester");
//     if (courseAbbr && semester) {
//       fetchSchedule(courseAbbr, semester);
//     } else {
//       setLoading(false); // stop loading if no data found
//     }
//   }, []);

//   if (loading) {
//     return <p>Loading schedule...</p>;
//   }

//   if (!schedule) {
//     return <p>No schedule found.</p>;
//   }

//   return (
//     <div className="w-full bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">
//         Generated Schedule
//       </h1>
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex">
//         {Object.keys(schedule).map((day) => (
//           <DayColumn
//             key={day}
//             day={day}
//             courses={schedule[day as keyof ScheduleProps]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Schedule;
