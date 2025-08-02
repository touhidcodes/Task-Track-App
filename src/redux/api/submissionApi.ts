import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create submission (Student)
    createSubmission: builder.mutation({
      query: (submissionData) => ({
        url: "/submissions",
        method: "POST",
        body: submissionData,
      }),
      invalidatesTags: [tagTypes.submission],
    }),

    // Get all submissions (Instructor/Admin/Student)
    getAllSubmissions: builder.query({
      query: (params) => ({
        url: "/submissions",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.submission],
    }),

    // Get single submission
    getSubmissionById: builder.query({
      query: (id) => ({
        url: `/submissions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.submission],
    }),

    // Get single submission count
    getSubmissionStatusCounts: builder.query({
      query: () => ({
        url: `/submissions/status`,
        method: "GET",
      }),
      providesTags: [tagTypes.submission],
    }),

    // Update submission (Resubmit / Feedback)
    updateSubmission: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/submissions/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [tagTypes.submission],
    }),

    // Delete submission
    deleteSubmission: builder.mutation({
      query: (id) => ({
        url: `/submissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.submission],
    }),
  }),
});

export const {
  useCreateSubmissionMutation,
  useGetAllSubmissionsQuery,
  useGetSubmissionStatusCountsQuery,
  useGetSubmissionByIdQuery,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} = submissionApi;
