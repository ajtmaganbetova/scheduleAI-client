export interface Course {
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
}

export interface ScheduleProps {
  Distant: Course[];
  Monday: Course[];
  Tuesday: Course[];
  Wednesday: Course[];
  Thursday: Course[];
  Friday: Course[];
  [key: string]: Course[]; // Add index signature
}