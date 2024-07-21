"use client";

import Sidebar from "@/components/Sidebar";
import ScheduleGrid from "@/components/ScheduleGrid";
import SearchBar from "@/components/SearchBar";

const BuilderPage = () => {
  return (
    <div>
      <Sidebar />
      <ScheduleGrid />
      <SearchBar />
    </div>
  );
};

export default BuilderPage;
