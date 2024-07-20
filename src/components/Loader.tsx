import React from "react";

const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="text-gray-700 font-semibold">Loading schedule...</p>
    </div>
  </div>
);

export default Loader;
