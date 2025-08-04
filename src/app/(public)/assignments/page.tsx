"use client";

import { useState } from "react";
import { useGetAllAssignmentsQuery } from "@/redux/api/assignmentsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  parseISO,
  isValid,
  isBefore,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import AssignmentSubmissionModal from "@/components/custom/Modal/AssignmentSubmissionModal";
import { useCreateSubmissionMutation } from "@/redux/api/submissionApi";
import { useSession } from "next-auth/react";

export default function AssignmentPage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const isInstructor = userRole === "INSTRUCTOR";
  const { data, isLoading } = useGetAllAssignmentsQuery({});
  const [createSubmission] = useCreateSubmissionMutation();
  const assignments = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 container mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-8 bg-gray-300 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getRemainingTime = (dueDateString: string) => {
    if (!dueDateString) return "No due date";

    const dueDate = parseISO(dueDateString);
    if (!isValid(dueDate)) return "Invalid date";

    const now = new Date();

    if (isBefore(dueDate, now)) {
      return "Deadline passed";
    }

    const totalDays = differenceInDays(dueDate, now);
    const totalHours = differenceInHours(dueDate, now);
    const totalMinutes = differenceInMinutes(dueDate, now);

    // If more than 1 day remaining
    if (totalDays > 1) {
      const remainingHours = totalHours - totalDays * 24;
      if (remainingHours > 0) {
        return `${totalDays} day${
          totalDays > 1 ? "s" : ""
        } ${remainingHours} hour${remainingHours !== 1 ? "s" : ""} remaining`;
      } else {
        return `${totalDays} day${totalDays > 1 ? "s" : ""} remaining`;
      }
    }
    // If exactly 1 day remaining
    else if (totalDays === 1) {
      const remainingHours = totalHours - 24;
      if (remainingHours > 0) {
        return `1 day ${remainingHours} hour${
          remainingHours !== 1 ? "s" : ""
        } remaining`;
      } else {
        return `1 day remaining`;
      }
    }
    // If less than 24 hours remaining
    else if (totalHours > 0) {
      const remainingMinutes = totalMinutes - totalHours * 60;
      if (totalHours >= 1) {
        return `${totalHours} hour${totalHours !== 1 ? "s" : ""} remaining`;
      } else {
        return `${remainingMinutes} minute${
          remainingMinutes !== 1 ? "s" : ""
        } remaining`;
      }
    }
    // If less than 1 hour remaining
    else {
      return `${totalMinutes} minute${totalMinutes !== 1 ? "s" : ""} remaining`;
    }
  };

  const handleSubmitClick = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleSubmitAssignment = async (submissionData: FieldValues) => {
    try {
      setLoading(true);
      const res = await createSubmission(submissionData);
      console.log(res);

      if (res?.data?.data?.id) {
        toast.success("Assignment Submitted successfully!");
      } else {
        toast.error("Submission already exists for this assignment");
      }
    } catch (error) {
      toast.error("Failed to submit assignment.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  return (
    <>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {assignments.length > 0 ? (
          assignments.map((assignment: any) => {
            const dueDateObj = assignment?.deadline
              ? parseISO(assignment.deadline)
              : null;

            const remainingTime = getRemainingTime(assignment?.deadline);

            const isUrgent =
              dueDateObj &&
              isValid(dueDateObj) &&
              differenceInDays(dueDateObj, new Date()) <= 1 &&
              !isBefore(dueDateObj, new Date());

            const isDeadlinePassed =
              dueDateObj && isBefore(dueDateObj, new Date());

            return (
              <Card
                key={assignment.id}
                className="shadow-sm hover:shadow-md transition"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {assignment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-md text-gray-600 mb-2">
                    {assignment.description}
                  </p>
                  <p
                    className={`text-md mb-4 ${
                      isUrgent ? "text-red-500 font-semibold" : "text-gray-500"
                    }`}
                  >
                    {remainingTime} <br />
                    <span className="text-md text-gray-400">
                      Due:{" "}
                      {dueDateObj && isValid(dueDateObj)
                        ? format(dueDateObj, "PPP p")
                        : "Invalid date"}
                    </span>
                  </p>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleSubmitClick(assignment)}
                    disabled={
                      isDeadlinePassed ||
                      !assignment.isAvailable ||
                      isInstructor
                    }
                    className={
                      isDeadlinePassed || isInstructor
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  >
                    {isInstructor
                      ? "Instructors Cannot Submit"
                      : isDeadlinePassed
                      ? "Deadline Passed"
                      : "Submit"}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No assignments available.</p>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <AssignmentSubmissionModal
        open={isModalOpen}
        assignmentId={selectedAssignment?.id || ""}
        assignmentTitle={selectedAssignment?.title || ""}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAssignment}
        loading={loading}
      />
    </>
  );
}
