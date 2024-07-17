// "use client"
// import { useEffect, useState } from "react";
// import axios from "axios";

// const BuilderPage = () => {
//   const [schedule, setSchedule] = useState(null);

//   useEffect(() => {
//     const fetchSchedule = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api/courses");
//         setSchedule(response.data);
//       } catch (error) {
//         console.error("Error fetching schedule:", error);
//       }
//     };

//     fetchSchedule();
//   }, []);

//   if (!schedule) {
//     return <p>Loading schedule...</p>;
//   }

//   return (
//     <div>
//       {/* Render schedule data */}
//       <pre>{JSON.stringify(schedule, null, 2)}</pre>
//     </div>
//   );
// };

// export default BuilderPage;
