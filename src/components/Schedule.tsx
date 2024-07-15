// "use client"
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const ScheduleComponent = () => {
//   const [schedule, setSchedule] = useState(null);
//   const fetchSchedule = async () => {
//     try {
//         console.log("Fetching schedule from client\n");
//         const response = await axios.post("http://localhost:3001/api/courses/", {
//         courseAbbr: "CSCI 299",
//         semester: "Summer 2024",
//         })
//         setSchedule(response.data);
//     } catch (error) {
//         console.error("Error fetching schedule:", error);
//         throw error;
//         }
//     }

//   useEffect(() => {
//     fetchSchedule();
//   }, []);

//   if (!schedule) {
//     return <p>Loading schedule...</p>;
//   }

//   // Render your schedule here based on `schedule` state
//   return (
//     <div className="p-4 border border-gray-200 rounded-md shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Schedule</h2>

//       {/* Render schedule data */}
//       <pre className="overflow-x-auto bg-black-100 p-4 rounded-md">
//         {JSON.stringify(schedule, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default ScheduleComponent;
