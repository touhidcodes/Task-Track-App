"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import FormContainer from "@/components/custom/Forms/FormContainer";
import FormInput from "@/components/custom/Forms/FormInput";
import FormSelect from "@/components/custom/Forms/FormSelect";
import { TSubmissionWithStudent } from "@/types/submission";

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
];

interface SubmissionFeedbackModalProps {
  open: boolean;
  submission: TSubmissionWithStudent | null;
  onClose: () => void;
  onSave: (values: FieldValues, submissionId: string) => void;
  isUpdate?: boolean;
}

const SubmissionFeedbackModal = ({
  open,
  submission,
  onClose,
  onSave,
  isUpdate,
}: SubmissionFeedbackModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isUpdate
              ? "Update Submission"
              : submission?.feedback
              ? "Update Feedback"
              : "Provide Feedback"}
          </DialogTitle>
        </DialogHeader>

        <FormContainer
          onSubmit={(values) => onSave(values, submission?.id || "")}
          defaultValues={{
            feedback: submission?.feedback || "",
            status: submission?.status || "PENDING",
          }}
        >
          {!isUpdate && (
            <FormInput
              name="feedback"
              label="Feedback"
              placeholder="Enter your feedback..."
            />
          )}
          <FormSelect name="status" label="Status" options={statusOptions} />

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#1C2D37] text-white">
              {submission?.feedback ? "Update" : "Submit"}
            </Button>
          </div>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionFeedbackModal;
