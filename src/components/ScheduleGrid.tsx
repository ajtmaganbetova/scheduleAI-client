import React, { useEffect, useState } from "react";
import axios from "axios";
import { Course, ScheduleProps } from "../types/course";

// Generate time slots on the hour
const generateTimeSlots = () => {
  const startHour = 8;
  const endHour = 23;
  const slots: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    slots.push(time);
  }

  return slots;
};

const timeSlots = generateTimeSlots(); // Generating time slots from 8:00 AM to 11:00 PM on the hour

const ScheduleGrid: React.FC = () => {
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
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  if (!schedule) {
    return <p>No schedule found.</p>;
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const distantCourses = schedule.Distant || []; // Handle distant courses separately

  return (
    <div className="w-full bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Generated Schedule
      </h1>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Distant Courses</h2>
        <div className="grid grid-cols-1 gap-4">
          {distantCourses.map((course: Course) => (
            <div
              key={course.abbreviation}
              className="bg-green-200 rounded-lg p-4 shadow-sm"
            >
              <strong>{course.abbreviation}</strong>
              <p>{course.title}</p>
              <p>{course.times}</p>
              <p>{course.room}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div></div> {/* Placeholder for the time column */}
        {days.map((day) => (
          <div key={day} className="text-xl font-semibold text-center p-2">
            {day}
          </div>
        ))}
        {timeSlots.map((time, index) => (
          <React.Fragment key={index}>
            <div className="text-center p-2 border-t">{time}</div>
            {days.map((day) => {
              const dayCourses = schedule[day as keyof ScheduleProps];
              const matchingCourses = dayCourses.filter((course) => {
                const [startTime, endTime] = course.times.split("-");
                return (
                  formatTime(startTime) <= time && formatTime(endTime) > time
                );
              });

              return (
                <div key={`${day}-${time}`} className="p-2 border-t h-20">
                  {matchingCourses.length > 0 ? (
                    matchingCourses.map((course, idx) => {
                      const [startTime, endTime] = course.times.split("-");
                      const startMinutes = timeToMinutes(startTime);
                      const endMinutes = timeToMinutes(endTime);
                      const courseStart = timeToMinutes(time);
                      const courseEnd = timeToMinutes(endTime);

                      const startRow =
                        Math.ceil((courseStart - startMinutes) / 5) + 1;
                      const endRow =
                        Math.ceil((endMinutes - courseEnd) / 5) + 1;

                      return (
                        <div
                          key={`${day}-${time}-${idx}`}
                          className="bg-blue-200 rounded-lg p-2 shadow-sm"
                          style={{
                            gridRow: `${startRow} / span ${endRow - startRow}`,
                          }}
                        >
                          <strong>{course.abbreviation}</strong>
                          <p>{course.title}</p>
                          <p>{course.times}</p>
                          <p>{course.room}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full"></div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const formatTime = (time: string) => {
  const [hourMinute, period] = time.trim().split(" "); // Trim and split by space
  const [hour, minute] = hourMinute.split(":");
  let hour24 = parseInt(hour);
  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }
  return `${hour24.toString().padStart(2, "0")}:${minute.padStart(2, "0")}`;
};

const timeToMinutes = (time: string) => {
  const [hourMinute, period] = time.trim().split(" "); // Trim and split by space
  const [hour, minute] = hourMinute.split(":");
  let hour24 = parseInt(hour);
  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }
  return hour24 * 60 + parseInt(minute);
};

export default ScheduleGrid;
