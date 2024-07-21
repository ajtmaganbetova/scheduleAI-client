import React from "react";

const times = [
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

const slotHeight = 50;

const TimeColumn: React.FC = () => (
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
        key={index} // Consider using a unique identifier if available
        className="text-right pr-2 text-gray-700 -translate-y-1/2"
        style={{
          height: `${slotHeight}px`,
          lineHeight: `${slotHeight}px`,
          marginTop: "0px",
        }}
      >
        {!(time.endsWith(":30") || time.endsWith(":30")) && time}
      </div>
    ))}
  </div>
);

export default TimeColumn;
