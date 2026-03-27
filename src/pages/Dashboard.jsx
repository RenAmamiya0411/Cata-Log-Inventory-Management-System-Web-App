import React, { useState, useEffect } from "react";
import StatCard from "../parts/StatCard";
import axios from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    lowStockItems: 0
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/dashboard/stats");
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchLowStock = async () => {
      try {
        const { data } = await axios.get("/products", {
          params: { limit: 100 }
        });
        const low = data.products.filter(p => p.stock <= p.lowStockThreshold);
        setLowStockProducts(low);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
    fetchLowStock();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Categories" value={stats.totalCategories} />
        <StatCard title="Low Stock Items" value={stats.lowStockItems} />
      </div>
      {lowStockProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Low Stock Alerts</h3>
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="cell-padding">Name</th>
                  <th className="cell-padding text-center">Category</th>
                  <th className="cell-padding text-center">Stock</th>
                  <th className="cell-padding text-center">Threshold</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map(product => (
                  <tr className="border-b bg-yellow-50" key={product._id}>
                    <td className="cell-padding">{product.name}</td>
                    <td className="cell-padding text-center">{product.category}</td>
                    <td className="cell-padding text-center text-red-600 font-semibold">{product.stock}</td>
                    <td className="cell-padding text-center">{product.lowStockThreshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
