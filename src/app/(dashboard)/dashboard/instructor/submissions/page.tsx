"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  useGetAllSubmissionsQuery,
  useUpdateSubmissionMutation,
} from "@/redux/api/submissionApi";
import DashboardSubmissionTable from "@/components/custom/Table/DashboardSubmissionTable";
import { TSubmissionWithStudent } from "@/types/submission";
import DashboardSearchBarSkeleton from "@/components/custom/Skeleton/DashboardSearchBarSkeleton";
import FormContainer from "@/components/custom/Forms/FormContainer";
import FormInput from "@/components/custom/Forms/FormInput";
import FormSelect from "@/components/custom/Forms/FormSelect";
import SubmissionFeedbackModal from "@/components/custom/Modal/SubmissionFeedbackModal";

interface FilterFormValues {
  searchTerm: string;
  status: string;
  sortBy: string;
}

const defaultFilters: FilterFormValues = {
  searchTerm: "",
  status: "",
  sortBy: "newest",
};

const statusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Title A-Z", value: "title-az" },
  { label: "Title Z-A", value: "title-za" },
];

const DashboardSubmissionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FieldValues>(defaultFilters);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateSubmission, setSelectedUpdateSubmission] =
    useState<TSubmissionWithStudent | null>(null);

  // Build query params dynamically
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", itemsPerPage.toString());

    if (filters.searchTerm) params.set("searchTerm", filters.searchTerm);
    if (filters.status) params.set("status", filters.status);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    return params.toString();
  }, [currentPage, itemsPerPage, filters]);

  const { data, isLoading } = useGetAllSubmissionsQuery(queryParams);
  const [updateSubmission] = useUpdateSubmissionMutation();

  const submissions = data?.data || [];
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

  // Filter Handlers
  const handleSubmitSearch = (values: FieldValues) => {
    setFilters(values);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setFilters(defaultFilters);
    setItemsPerPage(10);
    setCurrentPage(1);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleItemsPerPageChange = (value: number) => setItemsPerPage(value);

  // Update submission handler
  const handleUpdate = async (
    updatedSubmission: FieldValues,
    submissionId: string
  ) => {
    try {
      const res = await updateSubmission({
        id: submissionId,
        ...updatedSubmission,
      });
      if (res?.data?.id) {
        toast.success("Submission updated successfully!");
      }
    } catch (err) {
      console.error("Failed to update submission", err);
    }
  };

  // Modal open/close handlers
  const handleUpdateClick = (submission: TSubmissionWithStudent) => {
    setSelectedUpdateSubmission(submission);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUpdateSubmission(null);
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Submissions</h2>
        <div className="hidden md:block text-sm text-gray-600">
          Total Submissions: {totalItems}
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
                      placeholder="Search submissions..."
                      className="w-[200px] px-0 border-none focus:ring-0"
                    />
                  </div>
                  <div className="px-4 border-l border-gray-300">
                    <FormSelect
                      name="status"
                      options={statusOptions}
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
      <DashboardSubmissionTable
        submissions={submissions}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        onUpdateClick={handleUpdateClick}
      />

      {/* Modals */}
      <SubmissionFeedbackModal
        open={isUpdateModalOpen}
        submission={selectedUpdateSubmission}
        onClose={handleCloseUpdateModal}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default DashboardSubmissionsPage;
