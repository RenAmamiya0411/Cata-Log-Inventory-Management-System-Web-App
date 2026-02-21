import React from "react";
import StatCard from "../parts/StatCard";

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <StatCard title="Total Products" value="0" />
        <StatCard title="Total Categories" value="0" />
        <StatCard title="Low Stock Items" value="0" />
      </div>
    </div>
  );
}

export default Dashboard;
