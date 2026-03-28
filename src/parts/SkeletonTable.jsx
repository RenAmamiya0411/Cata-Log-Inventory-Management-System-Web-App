import React from "react";

function SkeletonTable() {
  return (
    <div className="bg-gray-800 rounded-lg shadow overflow-hidden animate-pulse">
      <div className="h-10 bg-gray-900"></div>
      {[...Array(5)].map((_, i) => (
        <div className="flex gap-4 px-6 py-4 border-b border-gray-700" key={i}>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/6"></div>
          <div className="h-4 bg-gray-700 rounded w-1/6"></div>
          <div className="h-4 bg-gray-700 rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonTable;
