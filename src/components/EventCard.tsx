import React from "react";
import { Course } from "../types/course";

interface EventCardProps {
  event: Course;
  height: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, height }) => (
  <div
    className="absolute top-0 left-0 right-0 p-2 rounded-lg shadow-md bg-blue-200"
    style={{ height: `${height}px` }}
  >
    <h3 className="font-semibold text-sm text-white">
      {event.abbreviation} {event.type}
    </h3>
    <p className="text-xs text-white">{event.times}</p>
    <p className="text-xs text-white">{event.faculty}</p>
    <p className="text-xs text-white">{event.room}</p>
  </div>
);

export default EventCard;
