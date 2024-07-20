import React from "react";

const NoSchedule: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="p-4 text-center bg-gray-100 rounded-lg shadow-md">
      <p className="text-gray-700 font-semibold">No schedule found.</p>
      <p className="text-gray-500 mt-2">
        Please check your input or try again later.
      </p>
    </div>
  </div>
);

export default NoSchedule;
