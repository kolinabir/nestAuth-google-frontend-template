import { baseApi } from "../api"; // Make sure to import this
import { JobQueryParams, JobResponse } from "./jobAPi.interface";

const createQueryString = (params: Partial<JobQueryParams>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => queryParams.append(key, item));
    } else if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams.toString();
};

const JobApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getJobs: build.query<JobResponse, Partial<JobQueryParams> | void>({
      query: (params) => {
        const queryString = params ? createQueryString(params) : '';
        return `jobs?${queryString}`;
      },
    }),
    // http://localhost:4000/jobs/appliedJobs/user
    getAppliedJobsByUser: build.query({
      query: () => ({
        url: "/jobs/appliedJobs/user",
        method: "GET",
      }),
    }),
    getPostedJobsByUser: build.query({
      query: () => ({
        url: "/jobs/user/posted",
      })
    })
  }),
});

export const { useGetJobsQuery, useGetAppliedJobsByUserQuery, useGetPostedJobsByUserQuery } = JobApi;
