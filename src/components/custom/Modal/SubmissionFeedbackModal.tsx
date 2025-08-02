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
import { TSubmissionWithStudent } from "@/types/submission";
import FormContainer from "../Forms/FormContainer";
import FormTextarea from "../Forms/FormTextarea";
import FormSelect from "../Forms/FormSelect";

interface TUpdateSubmissionModalProps {
  open: boolean;
  submission: TSubmissionWithStudent | null;
  onClose: () => void;
  onSave: (updatedSubmission: FieldValues, submissionId: string) => void;
}

const SubmissionFeedbackModal = ({
  open,
  submission,
  onClose,
  onSave,
}: TUpdateSubmissionModalProps) => {
  const [loading, setLoading] = useState(false);

  const [updatedSubmission, setUpdatedSubmission] =
    useState<TSubmissionWithStudent | null>(submission);

  useEffect(() => {
    setUpdatedSubmission(submission);
  }, [submission]);

  const handleUpdateSubmission = async (values: FieldValues) => {
    if (!submission) return;
    try {
      setLoading(true);
      await onSave(values, submission.id);
      toast.success("Submission updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Update Submission</DialogTitle>
        </DialogHeader>

        <div className="p-4 overflow-y-auto max-h-[75vh] space-y-6">
          {/* Display submission info as plain text */}
          <section>
            <h3 className="font-semibold text-lg mb-2">Submission Info</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <div>
                <span className="font-medium">Submission URL: </span>
                <a
                  href={updatedSubmission?.submissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {updatedSubmission?.submissionUrl || "N/A"}
                </a>
              </div>
              <div>
                <span className="font-medium">Student Username: </span>
                <span>{updatedSubmission?.student?.username || "N/A"}</span>
              </div>
              <div>
                <span className="font-medium">Student Email: </span>
                <span>{updatedSubmission?.student?.email || "N/A"}</span>
              </div>
              <div>
                <span className="font-medium">Assignment Title: </span>
                <span>{updatedSubmission?.assignment?.title || "N/A"}</span>
              </div>
            </div>
          </section>

          {/* Editable form for notes, feedback, and status */}
          <FormContainer
            onSubmit={handleUpdateSubmission}
            defaultValues={{
              note: updatedSubmission?.note || "",
              feedback: updatedSubmission?.feedback || "",
              status: updatedSubmission?.status || "PENDING",
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <FormTextarea
                label="Notes"
                name="note"
                placeholder="Enter notes here"
              />
              <FormTextarea
                label="Feedback"
                name="feedback"
                placeholder="Enter feedback here"
              />
              <FormSelect
                label="Status"
                name="status"
                options={[
                  { label: "Pending", value: "PENDING" },
                  { label: "Approved", value: "APPROVED" },
                  { label: "Rejected", value: "REJECTED" },
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
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#1C2D37] text-white hover:bg-[#2a3f4a]"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Update Submission"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionFeedbackModal;
