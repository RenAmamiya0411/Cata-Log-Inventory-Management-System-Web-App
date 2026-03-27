import React from "react";

function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-700 rounded w-1/4"></div>
    </div>
  );
}

export default SkeletonCard;
