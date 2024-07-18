import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScheduleProps } from "../types/course";

const times = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
];

const getTimeSlotIndex = (time: string) => {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr.split(" ")[0]);
  const period = time.split(" ")[1];

  let adjustedHours = hours;

  // Adjust for PM hours not equal to 12
  if (period === "PM" && hours !== 12) {
    adjustedHours += 12;
  } else if (period === "AM" && hours === 12) {
    adjustedHours = 0; // Midnight case (12:xx AM)
  }

  // Calculate the index in the times array
  const index = (adjustedHours - 8) * 2 + (minutes >= 30 ? 1 : 0);

  return index;
};

const getFormattedTime = (time: string) => {
  const [start, end] = time.split("-").map((t) => t.trim());
  return { start, end };
};

const calculateSessionDuration = (times: string) => {
  const [start, end] = times.split("-");

  // convert time string to minutes
  const timeToMinutes = (time: string) => {
    const matchResult = time.match(/(\d+):(\d+)\s*([APM]+)/i);
    const [hours, minutes, period] = matchResult ? matchResult.slice(1) : [];
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    if (period.toUpperCase() === "PM" && hours !== "12") {
      totalMinutes += 12 * 60;
    } else if (period.toUpperCase() === "AM" && hours === "12") {
      totalMinutes -= 12 * 60;
    }
    return totalMinutes;
  };

  const startMinutes = timeToMinutes(start.trim());
  const endMinutes = timeToMinutes(end.trim());

  // Calculate duration in minutes
  const durationInMinutes = endMinutes - startMinutes;

  return durationInMinutes;
};

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

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-6 gap-4">
        <div className="text-center font-bold">Mon</div>
        <div className="text-center font-bold">Tue</div>
        <div className="text-center font-bold">Wed</div>
        <div className="text-center font-bold">Thu</div>
        <div className="text-center font-bold">Fri</div>
      </div>
      <div className="grid grid-cols-7 gap-4 mt-4">
        <div className="col-span-1 flex flex-col">
          {times.map((time, index) => (
            <div
              key={index}
              className="flex-1 text-right pr-2 border-t border-gray-300"
            >
              {time}
            </div>
          ))}
        </div>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
          (day, dayIndex) => (
            <div
              key={dayIndex}
              className="col-span-1 flex flex-col border-l border-gray-300"
            >
              {times.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 border-t border-gray-300 relative"
                >
                  {schedule[day as keyof ScheduleProps]?.map(
                    (event, eventIndex) => {
                      const { start, end } = getFormattedTime(event.times);
                      const startIndex = getTimeSlotIndex(start);
                      const endIndex = getTimeSlotIndex(end);
                      if (index === startIndex) {
                        const duration = calculateSessionDuration(event.times);
                        const eventHeight = (duration / 30) * 25;
                        return (
                          <div
                            key={eventIndex}
                            className="absolute top-0 left-0 right-0 p-2 rounded shadow bg-blue-200"
                            style={{ height: `${eventHeight}px` }}
                          >
                            <h3 className="font-semibold text-sm">
                              {event.abbreviation} {event.type}
                            </h3>
                            <p className="text-xs">{event.times}</p>
                            <p className="text-xs text-gray-600">
                              {event.faculty}
                            </p>
                            <p className="text-xs text-gray-600">
                              {event.room}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ScheduleGrid;
