"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import ScheduleGrid from "@/components/ScheduleGrid";
import { SendIcon } from "lucide-react";

const BuilderPage = () => {

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <ScheduleGrid />
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-4">
        {/* onSubmit={handleSubmit} */}
        <form>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Can you make them all in the afternoon?"
              // value={searchTerm}
              // onChange={handleSearch}
              className="w-full rounded-full bg-[#000] px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 text-muted-foreground"
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderPage;
