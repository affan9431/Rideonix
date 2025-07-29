import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { format } from "date-fns"; // If you don’t already use it

export default function DriverPerformance() {
  const [rideHistory, setRideHistory] = useState([]);
  const ridesPerMonth = {};

  rideHistory.forEach((ride) => {
    if (!ride.createdAt) return;

    const month = format(new Date(ride.createdAt), "MMM yyyy"); // e.g. "Jul 2025"

    if (ridesPerMonth[month]) {
      ridesPerMonth[month] += 1;
    } else {
      ridesPerMonth[month] = 1;
    }
  });

  // Convert to array for chart
  const chartData = Object.entries(ridesPerMonth).map(([month, count]) => ({
    month,
    rides: count,
  }));

  const COLORS = [
    "#a7f3d0",
    "#c4b5fd",
    "#fcd34d",
    "#fca5a5",
    "#f9a8d4",
    "#93c5fd",
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get("https://rideonix-backend.onrender.com/api/rideHistory");
      setRideHistory(res.data.data);
    };
    fetchHistory();
  }, []);

  const totalEarning = rideHistory.reduce((sum, ride) => {
    return sum + parseFloat(ride.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Driver Dashboard</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-100 text-purple-700 p-6 rounded-lg shadow text-center">
          <p className="font-semibold text-lg">Total Earning</p>
          <p className="text-xl font-bold">₹{totalEarning.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 text-blue-700 p-6 rounded-lg shadow text-center">
          <p className="font-semibold text-lg">Total Ride</p>
          <p className="text-xl font-bold">
            {rideHistory && rideHistory.length}
          </p>
        </div>
        <div className="bg-pink-100 text-pink-700 p-6 rounded-lg shadow text-center">
          <p className="font-semibold text-lg">Average Rating</p>
          <p className="text-xl font-bold">4.5</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Active Per Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rides" radius={[5, 5, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
