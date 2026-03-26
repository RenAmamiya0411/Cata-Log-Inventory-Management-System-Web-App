import React, { useState, useEffect } from "react";
import StatCard from "../parts/StatCard";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStockItems: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Categories" value={stats.totalCategories} />
        <StatCard title="Low Stock Items" value={stats.lowStockItems} />
      </div>
    </div>
  );
}

export default Dashboard;
