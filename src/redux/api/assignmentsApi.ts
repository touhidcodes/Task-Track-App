import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const assignmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all assignments
    getAllAssignments: build.query({
      query: () => ({
        url: "/assignments/all",
        method: "GET",
      }),
      providesTags: [tagTypes.assignment],
    }),

    // Get single assignment by ID
    getSingleAssignment: build.query({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.assignment],
    }),
    getInstructorAssignments: build.query({
      query: (queryParams) => ({
        url: `/assignments/instructor?${queryParams}`,
        method: "GET",
      }),
      providesTags: [tagTypes.assignment],
    }),

    // Create new assignment
    createAssignment: build.mutation({
      query: (assignmentData) => ({
        url: "/assignments",
        method: "POST",
        data: assignmentData,
      }),
      invalidatesTags: [tagTypes.assignment],
    }),

    // Update assignment by ID
    updateAssignment: build.mutation({
      query: ({ assignmentId, updatedData }) => ({
        url: `/assignments/${assignmentId}`,
        method: "PUT",
        data: updatedData,
      }),
      invalidatesTags: [tagTypes.assignment],
    }),

    // Delete assignment by ID
    deleteAssignment: build.mutation({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.assignment],
    }),
  }),
});

export const {
  useGetAllAssignmentsQuery,
  useGetSingleAssignmentQuery,
  useGetInstructorAssignmentsQuery,
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
