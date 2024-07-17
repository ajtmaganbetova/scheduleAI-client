// import React from "react";
// import { Course } from "../types/course";
// import TimeSlot from "./TimeSlot";

// type DayColumnProps = {
//   day: string;
//   courses: Course[];
//   timeSlots: string[];
// };

// const DayColumn: React.FC<DayColumnProps> = ({ day, courses, timeSlots }) => {
//   const getCourseAtTime = (time: string) => {
//     return courses.find((course) => course.times === time);
//   };

//   return (
//     <div className="flex flex-col">
//       <h2 className="text-xl font-semibold text-center p-2">{day}</h2>
//       {timeSlots.map((time, index) => (
//         <TimeSlot key={index} time={time} course={getCourseAtTime(time)} />
//       ))}
//     </div>
//   );
// };

// export default DayColumn;
