import React from "react";
import StatCard from "../parts/StatCard";

function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value="0" />
        <StatCard title="Total Categories" value="0" />
        <StatCard title="Low Stock Items" value="0" />
      </div>
    </div>
  );
}

export default Dashboard;
