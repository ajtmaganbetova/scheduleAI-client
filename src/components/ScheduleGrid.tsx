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
    console.log("Fetching course data...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
        {
          courseAbbr,
          semester,
        }
      );

      console.log("Fetched Data:", response.data);
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
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Running useEffect...");
    const selectedCourse = localStorage.getItem("courseAbbr");
    const selectedSemester = localStorage.getItem("semester");
    if (selectedCourse && selectedSemester) {
      const parsedCourses = JSON.parse(selectedCourse);
      fetchCourseData(parsedCourses, selectedSemester);
    } else {
      setLoading(false);
    }
  }, []); // Make sure this dependency array is accurate

  if (loading) {
    return <Loader />;
  }

  if (!schedule) {
    return <NoSchedule />;
  }

  console.log("Rendering Schedule:", schedule);

  return (
    <div className="flex flex-col flex-1 ml-64">
      <div className="flex justify-between items-center py-3 px-6 border-b">
        <div className="text-xl font-bold">
          {localStorage.getItem("semester")}
        </div>
        <button className="bg-black text-white py-2 px-4 rounded">
          Edit schedule
        </button>
      </div>
      <div className="flex-1 flex flex-col mr-2">
        <div className="flex sticky top-0 z-10 bg-white border-b border-r">
          <div
            className="text-center font-bold py-1"
            style={{ width: "100px" }}
          >
            Time
          </div>
          <div className="flex-1 grid grid-cols-5 gap-0 items-end">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <div key={index} className="text-center font-bold border-l py-1">
                {day}
              </div>
            ))}
          </div>
        </div>
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
