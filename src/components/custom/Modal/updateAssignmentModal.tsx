"use client";

import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormContainer from "../Forms/FormContainer";
import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";
import FormSelect from "../Forms/FormSelect";
import { TAssignment } from "@/types/assignment";
import FormDateTimePicker from "../Forms/FormDateTimePicker";

interface TUpdateAssignmentModalProps {
  open: boolean;
  assignment: TAssignment | null;
  onClose: () => void;
  onSave: (updatedAssignment: FieldValues, assignmentId: string) => void;
}

const UpdateAssignmentModal = ({
  open,
  assignment,
  onClose,
  onSave,
}: TUpdateAssignmentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [updatedAssignment, setUpdatedAssignment] =
    useState<TAssignment | null>(assignment);

  useEffect(() => {
    setUpdatedAssignment(assignment);
  }, [assignment]);

  const handleUpdateAssignment = async (values: FieldValues) => {
    if (!assignment) return;
    try {
      setLoading(true);
      const updatedData = {
        ...values,
        deadline: new Date(values.deadline).toISOString(),
        isAvailable: values.isAvailable === "true",
        isDeleted: values.isDeleted === "true",
      };
      onSave(updatedData, assignment.id);
      toast.success("Assignment updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Update Assignment</DialogTitle>
        </DialogHeader>

        <div className="p-1 overflow-y-auto max-h-[75vh] pr-2">
          <FormContainer
            onSubmit={handleUpdateAssignment}
            defaultValues={{
              title: updatedAssignment?.title || "",
              description: updatedAssignment?.description || "",
              deadline: updatedAssignment?.deadline
                ? new Date(updatedAssignment.deadline)
                    .toISOString()
                    .slice(0, 16)
                : "",
              isAvailable: String(updatedAssignment?.isAvailable ?? true),
              isDeleted: String(updatedAssignment?.isDeleted ?? false),
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Title"
                name="title"
                placeholder="Assignment title"
                required
              />
              <FormDateTimePicker label="Deadline" name="deadline" required />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4">
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Enter assignment details..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <FormSelect
                label="Availability"
                name="isAvailable"
                placeholder="Select availability"
                options={[
                  { label: "Available", value: "true" },
                  { label: "Closed", value: "false" },
                ]}
                required
              />
              <FormSelect
                label="Deleted Status"
                name="isDeleted"
                placeholder="Select delete status"
                options={[
                  { label: "Active", value: "false" },
                  { label: "Deleted", value: "true" },
                ]}
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#1C2D37] text-white hover:bg-[#2a3f4a]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Update Assignment"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAssignmentModal;
