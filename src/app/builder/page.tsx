"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BuilderPage = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async (courseAbbr: string, semester: string) => {
    try {
      const response = await axios.post("http://localhost:3001/api/courses/", {
        courseAbbr: courseAbbr,
        semester: semester,
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
      setLoading(false); // If no data is found in localStorage, stop loading
    }
  }, []);

  if (loading) {
    return <p>Loading schedule...</p>;
  }

  if (!schedule) {
    return <p>No schedule found.</p>;
  }
  return (
    <div>
      {/* Render schedule data */}
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
  );
};

export default BuilderPage;
