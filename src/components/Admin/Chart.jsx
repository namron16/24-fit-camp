import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./chart.css";

const Chart = () => {
  const activeMemberData = [
    { date: "Sun", "Active Member": 23 },
    { date: "M", "Active Member": 56 },
    { date: "T", "Active Member": 12 },
    { date: "W", "Active Member": 123 },
    { date: "Th", "Active Member": 78 },
    { date: "F", "Active Member": 44 },
    { date: "Sat", "Active Member": 61 },
  ];

  return (
    <div className="charts">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={activeMemberData}>
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Line dataKey="Active Member" stroke="#1edb17" />
          <Tooltip />
          <CartesianGrid strokeDasharray="5 5" stroke="#fff" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
