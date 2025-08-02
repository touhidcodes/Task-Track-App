"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash, BookOpen } from "lucide-react";
import { TAssignment } from "@/types/assignment";
import { TPaginationData } from "@/types/pagination";
import DashboardTableSkeleton from "../Skeleton/DashboardTableSkeleton";

interface AssignmentsTableProps {
  assignments: TAssignment[];
  isLoading: boolean;
  paginationData: TPaginationData;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  onUpdateClick: (assignment: TAssignment) => void;
  onDeleteClick: (assignment: TAssignment) => void;
}

const DashboardAssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
  isLoading,
  paginationData,
  onPageChange,
  onItemsPerPageChange,
  onUpdateClick,
  onDeleteClick,
}) => {
  const { currentPage, totalPages, totalItems, itemsPerPage, start, end } =
    paginationData;

  if (isLoading) {
    return <DashboardTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="hidden md:block text-gray-600">
          Showing {start} to {end} of {totalItems} assignments
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
        {assignments?.length ? (
          <Table>
            <TableHeader>
              <TableRow className="[&>*]:whitespace-nowrap sticky top-0 bg-background after:content-[''] after:inset-x-0 after:h-px after:bg-border after:absolute after:bottom-0 z-10">
                <TableHead className="pl-6">Title</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-center">Available</TableHead>
                <TableHead className="text-center">Deleted</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assignments?.map((assignment: TAssignment) => (
                <TableRow
                  key={assignment.id}
                  className="odd:bg-muted/50 [&>*]:whitespace-nowrap"
                >
                  <TableCell className="pl-6">
                    <div className="font-medium">{assignment.title}</div>
                  </TableCell>

                  <TableCell>
                    {assignment.deadline
                      ? new Date(assignment.deadline).toLocaleString()
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    <div className="text-center">
                      <Badge
                        variant={
                          assignment.isAvailable ? "default" : "destructive"
                        }
                        className={
                          assignment.isAvailable
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : ""
                        }
                      >
                        {assignment.isAvailable ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-center">
                      <Badge
                        variant={
                          assignment.isDeleted ? "destructive" : "default"
                        }
                        className={
                          assignment.isDeleted
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : ""
                        }
                      >
                        {assignment.isDeleted ? "Yes" : "No"}
                      </Badge>
                    </div>
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
                          onClick={() => onUpdateClick(assignment)}
                          className="hover:bg-indigo-600 hover:text-white transition-colors px-3 py-2 cursor-pointer text-sm flex items-center gap-2"
                        >
                          <Pencil className="w-4 h-4" />
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteClick(assignment)}
                          className="hover:bg-red-600 hover:text-white transition-colors px-3 py-2 cursor-pointer text-sm flex items-center gap-2"
                        >
                          <Trash className="w-4 h-4" />
                          Delete
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
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              No Assignments Found
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven&apos;t created any assignments yet.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={`transition-all duration-200 ${
                    currentPage === 1
                      ? "pointer-events-none opacity-50 cursor-not-allowed"
                      : "bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
                  }`}
                />
              </PaginationItem>

              {/* Page Indicator */}
              <PaginationItem className="px-4 flex items-center text-sm text-gray-700">
                Page
                <span className="mx-1 font-semibold"> {currentPage}</span>
                of <span className="ml-1 font-semibold"> {totalPages}</span>
              </PaginationItem>

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
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

export default DashboardAssignmentsTable;
