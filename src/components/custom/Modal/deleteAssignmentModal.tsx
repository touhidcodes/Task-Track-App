"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { TAssignment } from "@/types/assignment";

interface DeleteAssignmentModalProps {
  open: boolean;
  assignment: TAssignment | null;
  onClose: () => void;
  onConfirm: (assignmentId: string) => void;
}

const DeleteAssignmentModal = ({
  open,
  assignment,
  onClose,
  onConfirm,
}: DeleteAssignmentModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    try {
      setLoading(true);
      if (assignment?.id) {
        onConfirm(assignment.id);
        onClose();
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to delete assignment.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Assignment
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[300px] space-y-2 text-sm text-gray-700">
          <p>Are you sure you want to delete this assignment?</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>Title:</strong> {assignment?.title}
            </li>
            <li>
              <strong>Deadline:</strong>{" "}
              {assignment?.deadline
                ? new Date(assignment.deadline).toLocaleString()
                : "N/A"}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {assignment?.isAvailable ? "Available" : "Closed"}
            </li>
            <li>
              <strong>Deleted:</strong> {assignment?.isDeleted ? "Yes" : "No"}
            </li>
          </ul>
          <p className="text-red-500 font-medium">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="pt-4 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAssignmentModal;
