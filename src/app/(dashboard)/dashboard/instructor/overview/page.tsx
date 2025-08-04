"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetSubmissionStatusCountsQuery } from "@/redux/api/submissionApi";

const COLORS = ["#facc15", "#22c55e", "#ef4444"];

const InstructorDashboardOverviewPage = () => {
  const { data: apiResponse, isLoading } = useGetSubmissionStatusCountsQuery(
    {}
  );
  // Extract counts safely
  const counts = apiResponse?.data || { pending: 0, accepted: 0, rejected: 0 };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        Loading...
      </div>
    );
  }

  // Prepare chart data
  const statusData = [
    { name: "Pending", value: counts.pending },
    { name: "Accepted", value: counts.accepted },
    { name: "Rejected", value: counts.rejected },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Submission Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboardOverviewPage;
