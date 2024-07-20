// convert a time string to 24-hour format
const convertTimeTo24Hour = (time: string): [number, number] => {
  if (!time || typeof time !== "string") {
    console.error("Invalid time string:", time);
    throw new TypeError("Invalid time string");
  }

  const [timePart, period] = time.split(" ");
  if (!timePart || !period) {
    console.error("Invalid time string format:", time);
    throw new TypeError("Invalid time string format");
  }

  const [hoursStr, minutesStr] = timePart.split(":");
  if (!hoursStr || !minutesStr) {
    console.error("Invalid time string format:", time);
    throw new TypeError("Invalid time string format");
  }

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return [hours, minutes];
};

// calculate the duration of a session in minutes
export const calculateSessionDuration = (timeRange: string): number => {
  if (!timeRange || typeof timeRange !== "string") {
    console.error("Invalid time range string:", timeRange);
    throw new TypeError("Invalid time range string");
  }

  const [start, end] = timeRange.split("-");
  if (!start || !end) {
    console.error("Invalid time range format:", timeRange);
    throw new TypeError("Invalid time range format");
  }

  const [startHour, startMinute] = convertTimeTo24Hour(start.trim());
  const [endHour, endMinute] = convertTimeTo24Hour(end.trim());

  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
};

// get the index of a time slot
export const getTimeSlotIndex = (time: string): number => {
  if (!time || typeof time !== "string") {
    console.error("Invalid time string:", time);
    throw new TypeError("Invalid time string");
  }

  const [timePart, period] = time.split(" ");
  if (!timePart || !period) {
    console.error("Invalid time string format:", time);
    throw new TypeError("Invalid time string format");
  }

  const [hoursStr, minutesStr] = timePart.split(":");
  if (!hoursStr || !minutesStr) {
    console.error("Invalid time string format:", time);
    throw new TypeError("Invalid time string format");
  }

  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Calculate the index based on the start time of 7:30 AM
  const startHour = 7;
  const startMinute = 30;
  const totalMinutes = hours * 60 + minutes - (startHour * 60 + startMinute);
  return Math.floor(totalMinutes / 30);
};

// get the formatted start and end times from a time range
export const getFormattedTime = (
  timeRange: string
): { start: string; end: string } => {
  if (!timeRange || typeof timeRange !== "string") {
    console.error("Invalid time range string:", timeRange);
    throw new TypeError("Invalid time range string");
  }

  const [start, end] = timeRange.split("-");
  if (!start || !end) {
    console.error("Invalid time range format:", timeRange);
    throw new TypeError("Invalid time range format");
  }

  return { start: start.trim(), end: end.trim() };
};
