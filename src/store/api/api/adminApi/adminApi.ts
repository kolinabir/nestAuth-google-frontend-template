import { baseApi } from "../api";
import { JobListParams, JobListResponse } from "./adminApi.interface";

const AdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getJobList: build.query<JobListResponse, JobListParams>({
      query: (params) => ({
        url: "/admin/jobs",
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          jobTitle: params.jobTitle,
          jobID: params.jobID,
          isApproved: params.isApproved,
          companyName: params.companyName,
          isRejected: params.isRejected,
        },
      }),
    }),
    approveJob: build.mutation<void, { jobId: string; isApproved: boolean }>({
      query: ({ jobId, isApproved }) => ({
        url: `/admin/approve-job/${jobId}`,
        method: "PUT",
        body: { isApproved },
      }),
    }),
    rejectJob: build.mutation<void, { jobId: string; rejectedReason: string }>({
      query: ({ jobId, rejectedReason }) => ({
        url: `/admin/reject-job/${jobId}`,
        method: "PUT",
        body: { rejectedReason },
      }),
    }),
  }),
});

export const {
  useGetJobListQuery,
  useApproveJobMutation,
  useRejectJobMutation,
} = AdminApi;
