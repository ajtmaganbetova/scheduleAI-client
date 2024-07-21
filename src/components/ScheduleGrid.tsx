import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScheduleProps, Course } from "../types/course";
import TimeColumn from "./TimeColumn";
import DayColumn from "./DayColumn";
import Loader from "./Loader";
import NoSchedule from "./NoSchedule";
import styles from "../styles/ScheduleGrid.module.css";

const ScheduleGrid: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [allSections, setAllSections] = useState<{
    [key: string]: Course;
  } | null>(null);

  const fetchCourseData = async (courseAbbr: string[], semester: string) => {
    try {
      const response = await axios.post("http://localhost:3001/api/courses", {
        courseAbbr,
        semester,
      });
      console.log("Fetched Data:", response.data); // Debugging
      // Assuming the response has `extractedSchedule` as an array with one object
      setSchedule(response.data.extractedSchedule[0]);
      localStorage.setItem(
        "extractedSchedule",
        JSON.stringify(response.data.extractedSchedule[0])
      );
      setAllSections(response.data.allSections);
      localStorage.setItem(
        "allSections",
        JSON.stringify(response.data.allSections)
      );
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCourse = localStorage.getItem("courseAbbr");
    const selectedSemester = localStorage.getItem("semester");
    if (selectedCourse && selectedSemester) {
      const parsedCourses = JSON.parse(selectedCourse); // Parse JSON string to array
      fetchCourseData(parsedCourses, selectedSemester);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!schedule) {
    return <NoSchedule />;
  }

  console.log("Schedule:", schedule); // Debugging

  return (
    <div className="flex flex-col flex-1 ml-64">
      {/* Term Header */}
      <div className="flex justify-between items-center py-3 px-6 border-b">
        <div className="text-xl font-bold">
          {localStorage.getItem("semester")}
        </div>
        <button className="bg-black text-white py-2 px-4 rounded">
          Edit schedule
        </button>
      </div>
      <div className="flex-1 flex flex-col mr-2">
        {/* Header Row */}
        <div className="flex sticky top-0 z-10 bg-white border-b border-r">
          <div className="flex gap-0">
            <div
              className="text-center font-bold py-1"
              style={{ width: "100px" }}
            >
              Time
            </div>
          </div>
          <div className="flex-1 grid grid-cols-5 gap-0 items-end">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <div key={index} className="text-center font-bold border-l py-1">
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="flex">
          <TimeColumn />
          <div className="flex-1 grid grid-cols-5 gap-0">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day, dayIndex) => (
                <DayColumn
                  key={dayIndex}
                  day={day}
                  events={schedule[day as keyof ScheduleProps]}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ScheduleGrid;
