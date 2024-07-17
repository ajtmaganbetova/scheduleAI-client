"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import ScheduleGrid from "@/components/ScheduleGrid";

const BuilderPage = () => {

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <ScheduleGrid />
    </div>
  );
};

export default BuilderPage;
