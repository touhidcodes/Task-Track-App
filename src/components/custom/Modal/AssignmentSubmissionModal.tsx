"use client";

import React from "react";
import { FieldValues } from "react-hook-form";

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

interface TSubmissionModalProps {
  open: boolean;
  assignmentId: string;
  assignmentTitle: string;
  onClose: () => void;
  onSubmit: (submissionData: FieldValues) => void;
  loading: boolean;
}

const AssignmentSubmissionModal = ({
  open,
  assignmentId,
  assignmentTitle,
  onClose,
  onSubmit,
  loading,
}: TSubmissionModalProps) => {
  const handleSubmitAssignment = (values: FieldValues) => {
    const submissionData = {
      assignmentId,
      submissionUrl: values.submissionUrl,
      note: values.note || "",
    };
    onSubmit(submissionData);

    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Submit Assignment</DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Submitting: <span className="font-semibold">{assignmentTitle}</span>
          </p>
        </DialogHeader>

        <div className="p-1 overflow-y-auto max-h-[75vh] pr-2">
          <FormContainer
            onSubmit={handleSubmitAssignment}
            defaultValues={{
              submissionUrl: "",
              note: "",
            }}
          >
            <div className="grid grid-cols-1 gap-6">
              <FormInput
                label="Submission URL"
                name="submissionUrl"
                placeholder="Enter your submission URL (Google Drive, GitHub, etc.)"
                required
                type="url"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4">
              <FormTextarea
                name="note"
                label="Additional Notes (Optional)"
                placeholder="Add any additional notes about your submission..."
                rows={4}
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
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Submit Assignment"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentSubmissionModal;
