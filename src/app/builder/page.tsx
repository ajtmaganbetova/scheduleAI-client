"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Course = {
  school: string;
  level: string;
  abbreviation: string;
  type: string;
  title: string;
  credits: string;
  days: string;
  times: string;
  enrolled: string;
  capacity: string;
  faculty: string;
  room: string;
};

interface ScheduleProps {
  Monday: Course[];
  Tuesday: Course[];
  Wednesday: Course[];
  Thursday: Course[];
  Friday: Course[];
  Distant: Course[];
}

const BuilderPage = () => {
  const [schedule, setSchedule] = useState<ScheduleProps | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async (courseAbbr: string, semester: string) => {
    try {
      const response = await axios.post("http://localhost:3001/api/courses", {
        courseAbbr,
        semester,
      });
      setSchedule(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const courseAbbr = localStorage.getItem("courseAbbr");
    const semester = localStorage.getItem("semester");
    if (courseAbbr && semester) {
      fetchSchedule(courseAbbr, semester);
    } else {
      setLoading(false); // stop loading if no data found
    }
  }, []);

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  if (!schedule) {
    return <p>No schedule found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Generated Schedule
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {Object.keys(schedule).map((day) => (
          <div key={day} className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">{day}</h2>
            {schedule[day as keyof ScheduleProps].length > 0 ? (
              <ul className="space-y-4">
                {schedule[day as keyof ScheduleProps].map((course, index) => (
                  <li
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <strong className="text-lg font-semibold">
                      {course.abbreviation}
                    </strong>{" "}
                    - <span className="text-gray-600">{course.title}</span>
                    <div className="mt-2">
                      <span className="block text-gray-500">
                        <strong>Section:</strong> {course.type}
                      </span>
                      <span className="block text-gray-500">
                        <strong>Time:</strong> {course.times}
                      </span>
                      <span className="block text-gray-500">
                        <strong>Faculty:</strong> {course.faculty}
                      </span>
                      <span className="block text-gray-500">
                        <strong>Room:</strong> {course.room}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No courses</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderPage;
