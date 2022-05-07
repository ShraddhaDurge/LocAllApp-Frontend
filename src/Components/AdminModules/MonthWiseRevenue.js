import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const monthRevenue=JSON.parse(localStorage.getItem("monthTotalRevenue"))

export default function SalesReportChart() {
  return (
    <LineChart
      width={500}
      height={320}
      data={monthRevenue}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis/>
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
