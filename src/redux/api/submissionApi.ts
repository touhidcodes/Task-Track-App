import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all submissions (Instructor/Admin/Student)
    getAllSubmissions: build.query({
      query: (params) => ({
        url: `/submissions?${params}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.submission],
    }),

    // Get single submission
    getSubmissionById: build.query({
      query: (id) => ({
        url: `/submissions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.submission],
    }),

    // Get student  submissions
    getStudentSubmissions: build.query({
      query: () => ({
        url: `/submissions/student`,
        method: "GET",
      }),
      providesTags: [tagTypes.submission],
    }),

    // Get single submission count
    getSubmissionStatusCounts: build.query({
      query: () => ({
        url: `/submissions/status`,
        method: "GET",
      }),
      providesTags: [tagTypes.submission],
    }),

    // Get single submission count students
    getStudentSubmissionStatusCounts: build.query({
      query: () => ({
        url: `/submissions/status-student`,
        method: "GET",
      }),
      providesTags: [tagTypes.submission],
    }),

    // Create submission (Student)
    createSubmission: build.mutation({
      query: (submissionData) => ({
        url: "/submissions/create",
        method: "POST",
        data: submissionData,
      }),
      invalidatesTags: [tagTypes.submission],
    }),

    // Update submission (Resubmit / Feedback)
    updateSubmission: build.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/submissions/${id}`,
        method: "PATCH",
        data: updateData,
      }),
      invalidatesTags: [tagTypes.submission],
    }),

    // Delete submission
    deleteSubmission: build.mutation({
      query: (id) => ({
        url: `/submissions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.submission],
    }),
  }),
});

export const {
  useGetAllSubmissionsQuery,
  useGetStudentSubmissionsQuery,
  useGetSubmissionStatusCountsQuery,
  useGetStudentSubmissionStatusCountsQuery,
  useGetSubmissionByIdQuery,
  useCreateSubmissionMutation,
  useUpdateSubmissionMutation,
  useDeleteSubmissionMutation,
} = submissionApi;
