"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MoreHorizontal, Pencil, Trash, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { TPaginationData } from "@/types/pagination";
import DashboardTableSkeleton from "../Skeleton/DashboardTableSkeleton";
import { TSubmissionWithStudent } from "@/types/submission";

interface SubmissionCardTableProps {
  submissions: TSubmissionWithStudent[];
  isLoading: boolean;
  onUpdateClick: (submission: TSubmissionWithStudent) => void;
  paginationData: TPaginationData;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const DashboardSubmissionTable = ({
  submissions,
  isLoading,
  paginationData,
  onPageChange,
  onItemsPerPageChange,
  onUpdateClick,
}: SubmissionCardTableProps) => {
  const { currentPage, totalPages, totalItems, itemsPerPage, start, end } =
    paginationData;

  if (isLoading) {
    return <DashboardTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="hidden md:block text-gray-600">
          Showing {start} to {end} of {totalItems} submissions
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">per page</span>
        </div>
      </div>

      {/* Table */}
      <div className="grid w-full [&>div]:h-full [&>div]:border [&>div]:rounded">
        {submissions.length ? (
          <Table>
            <TableHeader>
              <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0 z-10">
                <TableHead className="pl-6">Assignment</TableHead>
                <TableHead className="text-center">Student</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {submissions.map((submission) => (
                <TableRow
                  key={submission.id}
                  className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                >
                  <TableCell className="pl-6">
                    {submission.assignment?.title || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    {submission.student?.username || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    {submission.student?.email || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        submission.status === "APPROVED"
                          ? "default"
                          : submission.status === "REJECTED"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        submission.status === "APPROVED"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : submission.status === "REJECTED"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : ""
                      }
                    >
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-accent/40 transition"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-44 bg-background border border-border rounded-md shadow-xl animate-in fade-in-0 zoom-in-95"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onUpdateClick(submission)}
                          className="hover:bg-indigo-600 hover:text-white transition-colors px-3 py-2 cursor-pointer text-sm flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Feedback
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 bg-slate-100 rounded-lg shadow-sm">
            <div className="flex justify-center mb-2">
              <Home className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No Submissions Found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              No submissions have been made yet.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={`transition-all duration-200 ${
                    currentPage === 1
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                  }`}
                />
              </PaginationItem>
              <PaginationItem className="px-4 flex items-center text-sm text-gray-700">
                Page <span className="mx-1 font-semibold">{currentPage}</span>{" "}
                of <span className="ml-1 font-semibold">{totalPages}</span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={`transition-all duration-200 ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DashboardSubmissionTable;
