import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScheduleProps } from "../types/course";

const times = [
    "7:30 AM",
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
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
];

const slotHeight = 50; // Height for each time slot

const getTimeSlotIndex = (time: string) => {
  const [hoursStr, minutesStr] = time.split(":");
  const hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr.split(" ")[0]);
  const period = time.split(" ")[1];

  let adjustedHours = hours;

  if (period === "PM" && hours !== 12) {
    adjustedHours += 12;
  } else if (period === "AM" && hours === 12) {
    adjustedHours = 0; // Midnight case (12:xx AM)
  }

  const index = (adjustedHours - 7.5) * 2 + (minutes >= 30 ? 1 : 0);

  return index;
};

const getFormattedTime = (time: string) => {
  const [start, end] = time.split("-").map((t) => t.trim());
  return { start, end };
};

const calculateSessionDuration = (times: string) => {
  const [start, end] = times.split("-");

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
    <div className="flex flex-1 ml-64 p-6">
      <div className="flex-1 flex flex-col">
        {/* Header Row */}
        <div className="flex sticky top-0">
          <div className="flex gap-0 mb-4">
            <div
              className="text-center font-bold border-r "
              style={{ width: "100px" }}
            ></div>
          </div>
          <div className="flex-1 grid grid-cols-5 gap-0 items-end border-b mb-4">
            <div className="text-center font-bold border-r ">Mon</div>
            <div className="text-center font-bold border-r ">Tue</div>
            <div className="text-center font-bold border-r ">Wed</div>
            <div className="text-center font-bold border-r ">Thu</div>
            <div className="text-center font-bold border-r ">Fri</div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="flex">
          {/* Time Column */}
          <div
            className="border-r"
            style={{
              width: "100px",
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
            }}
          >
            {times.map((time, index) => (
              <div
                key={index}
                className="text-right pr-2  text-gray-700"
                style={{
                  height: `${slotHeight}px`,
                  lineHeight: `${slotHeight}px`,
                  marginTop: "0px",
                }}
              >
                {!(time.endsWith(":30 AM") || time.endsWith(":30 PM")) && time}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          <div className="flex-1 grid grid-cols-5 gap-0">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day, dayIndex) => (
                <div key={dayIndex} className="flex flex-col border-r">
                  {Array(times.length)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="border-b relative"
                        style={{
                          height: `${slotHeight}px`,
                          lineHeight: `${slotHeight}px`,
                        }}
                      >
                        {schedule[day as keyof ScheduleProps]?.map(
                          (event, eventIndex) => {
                            const { start, end } = getFormattedTime(
                              event.times
                            );
                            const startIndex = getTimeSlotIndex(start);
                            const endIndex = getTimeSlotIndex(end);
                            if (index === startIndex) {
                              const duration = calculateSessionDuration(
                                event.times
                              );
                              const eventHeight = (duration / 30) * slotHeight;
                              return (
                                <div
                                  key={eventIndex}
                                  className="absolute top-0 left-0 right-0 p-2 rounded-lg shadow-md bg-blue-200"
                                  style={{ height: `${eventHeight}px` }}
                                >
                                  <h3 className="font-semibold text-sm text-white">
                                    {event.abbreviation} {event.type}
                                  </h3>
                                  <p className="text-xs text-white">
                                    {event.times}
                                  </p>
                                  <p className="text-xs text-white">
                                    {event.faculty}
                                  </p>
                                  <p className="text-xs text-white">
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
      </div>
    </div>
  );
};

export default ScheduleGrid;
