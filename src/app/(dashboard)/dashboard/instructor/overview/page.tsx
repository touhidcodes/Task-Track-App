"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useGetSubmissionStatusCountsQuery } from "@/redux/api/submissionApi";
// Adjust this API hook to match your data source
// Example API: should return { pending: number, accepted: number, rejected: number }

const COLORS = ["#facc15", "#22c55e", "#ef4444"];

const AdminDashboardOverviewPage = () => {
  const { data, isLoading } = useGetSubmissionStatusCountsQuery({}) as {
    data?: { pending: number; accepted: number; rejected: number };
    isLoading: boolean;
  };

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        Loading...
      </div>
    );
  }

  const statusData = [
    { name: "Pending", value: data?.pending ?? 0 },
    { name: "Accepted", value: data?.accepted ?? 0 },
    { name: "Rejected", value: data?.rejected ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Status Overview</CardTitle>
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
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverviewPage;
