import React from "react";
import { Course } from "../types/course";
import {
  getFormattedTime,
  getTimeSlotIndex,
  calculateSessionDuration,
} from "../utils/scheduleUtils";
import EventCard from "./EventCard";
import styles from "../styles/ScheduleGrid.module.css";

interface DayColumnProps {
  day: string;
  events: Course[] | undefined;
}

const slotHeight = 50;
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

const DayColumn: React.FC<DayColumnProps> = ({ day, events }) => {
  const slots = Array(times.length).fill(null);

  // Check for overlapping events and determine if a slot should hide its border
  const overlappingEvents = new Array(times.length).fill(false);

  events?.forEach((event) => {
    const { start, end } = getFormattedTime(event.times);
    const startIndex = getTimeSlotIndex(start);
    const endIndex = getTimeSlotIndex(end);
    for (let i = startIndex; i < endIndex; i++) {
      overlappingEvents[i] = true;
    }
  });

  return (
    <div className="flex flex-col border-r">
      {slots.map((_, index) => {
        // Determine if the current slot should hide its border
        const shouldHideBorder = overlappingEvents[index];
        return (
          <div
            key={index}
            className={`relative ${
              shouldHideBorder ? styles.hiddenBorderBottom : "border-b"
            }`}
            style={{ height: `${slotHeight}px`, lineHeight: `${slotHeight}px` }}
          >
            {events?.map((event, eventIndex) => {
              const { start, end } = getFormattedTime(event.times);
              const startIndex = getTimeSlotIndex(start);
              const endIndex = getTimeSlotIndex(end);
              if (index === startIndex) {
                const duration = calculateSessionDuration(event.times);
                const eventHeight = (duration / 30) * slotHeight;
                return (
                  <EventCard
                    key={eventIndex}
                    event={event}
                    height={eventHeight}
                  />
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DayColumn;
