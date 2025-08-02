"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  useGetInstructorAssignmentsQuery,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} from "@/redux/api/assignmentsApi";

import FormContainer from "@/components/custom/Forms/FormContainer";
import FormInput from "@/components/custom/Forms/FormInput";
import FormSelect from "@/components/custom/Forms/FormSelect";
import UpdateAssignmentModal from "@/components/custom/Modal/updateAssignmentModal";
import { TAssignment } from "@/types/assignment";
import DeleteAssignmentModal from "@/components/custom/Modal/deleteAssignmentModal";
import DashboardAssignmentsTable from "@/components/custom/Table/DashboardAssignmentTable";
import DashboardSearchBarSkeleton from "@/components/custom/Skeleton/DashboardSearchBarSkeleton";

interface FilterFormValues {
  searchTerm: string;
  availability: string;
  sortBy: string;
}

const defaultValues: FilterFormValues = {
  searchTerm: "",
  availability: "all",
  sortBy: "newest",
};

const availabilityOptions = [
  { label: "All Status", value: "all" },
  { label: "Available", value: "true" },
  { label: "Closed", value: "false" },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Deadline Soonest", value: "deadline-soon" },
  { label: "Deadline Latest", value: "deadline-late" },
  { label: "Title A-Z", value: "title-az" },
  { label: "Title Z-A", value: "title-za" },
];

const InstructorAssignmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FieldValues>(defaultValues);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateAssignment, setSelectedUpdateAssignment] =
    useState<TAssignment | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteAssignment, setSelectedDeleteAssignment] =
    useState<TAssignment | null>(null);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", itemsPerPage.toString());

    if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
    if (filters.availability !== "all")
      params.set("isAvailable", filters.availability);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    return params.toString();
  }, [currentPage, itemsPerPage, filters]);

  const { data, isLoading } = useGetInstructorAssignmentsQuery(queryParams);
  const [updateAssignment] = useUpdateAssignmentMutation();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const assignments = data?.data?.data || [];
  const totalItems = data?.meta?.total ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const paginationData = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    start,
    end,
  };

  const handleSubmitSearch = (values: FieldValues) => {
    setFilters(values);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setFilters(defaultValues);
    setItemsPerPage(10);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (value: number) => setItemsPerPage(value);

  const handleUpdate = async (
    updatedAssignment: FieldValues,
    assignmentId: string
  ) => {
    try {
      const payload = {
        ...updatedAssignment,
        deadline: new Date(updatedAssignment.deadline).toISOString(),
      };

      const res = await updateAssignment({ assignmentId, payload });
      if (res?.data?.id) toast.success("Assignment updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (assignmentId: string) => {
    try {
      const res = await deleteAssignment(assignmentId);
      if (res?.data?.id) toast.success("Assignment deleted successfully!");
    } catch (err) {
      console.error("Failed to delete assignment", err);
    }
  };

  const handleUpdateClick = (assignment: TAssignment) => {
    setSelectedUpdateAssignment(assignment);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUpdateAssignment(null);
  };

  const handleDeleteClick = (assignment: TAssignment) => {
    setSelectedDeleteAssignment(assignment);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeleteAssignment(null);
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Assignments</h2>
        <div className="hidden md:block text-sm text-gray-600">
          Total Assignments: {totalItems}
        </div>
      </div>

      {/* Filter & Search */}
      {isLoading ? (
        <DashboardSearchBarSkeleton />
      ) : (
        <div className="hidden md:block bg-white rounded-lg shadow-md border">
          <div className="flex items-center justify-between">
            <div className="bg-[#1C2D37] text-white px-4 py-5 text-sm font-semibold flex items-center rounded-l-lg">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
            </div>
            <div className="w-full mr-10 overflow-hidden">
              <FormContainer
                onSubmit={handleSubmitSearch}
                defaultValues={filters}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center px-4 border-l border-gray-300">
                    <Search className="w-4 h-4 text-muted-foreground mr-2" />
                    <FormInput
                      name="searchTerm"
                      placeholder="Search assignments..."
                      className="w-[200px] px-0 border-none focus:ring-0"
                    />
                  </div>
                  <div className="px-4 border-l border-gray-300">
                    <FormSelect
                      name="availability"
                      options={availabilityOptions}
                      placeholder="Status"
                      className="w-[140px] border-none"
                    />
                  </div>
                  <div className="px-4 border-l border-gray-300">
                    <FormSelect
                      name="sortBy"
                      options={sortOptions}
                      placeholder="Sort by"
                      className="w-[140px] border-none"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="px-4 border-l border-gray-300">
                      <Button
                        type="submit"
                        className="rounded-full px-6 bg-[#1C2D37] hover:bg-[#2a3f4a]"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearSearch}
                      className="ml-2 rounded-full px-6 border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              </FormContainer>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <DashboardAssignmentsTable
        assignments={assignments}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onUpdateClick={handleUpdateClick}
        onDeleteClick={handleDeleteClick}
      />

      {/* Modals */}
      <UpdateAssignmentModal
        open={isUpdateModalOpen}
        assignment={selectedUpdateAssignment}
        onClose={handleCloseUpdateModal}
        onSave={handleUpdate}
      />
      <DeleteAssignmentModal
        open={isDeleteModalOpen}
        assignment={selectedDeleteAssignment}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default InstructorAssignmentsPage;
