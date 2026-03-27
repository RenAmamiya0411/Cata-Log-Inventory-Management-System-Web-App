import React from "react";

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-white">{value}</p>
    </div>
  );
}

export default StatCard;
