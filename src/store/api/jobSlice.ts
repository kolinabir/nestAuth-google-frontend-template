import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface Job {
  jobTitle: string | null;
  description: string | null;
  companyName: string | null;
  location: string | null;
  EmploymentType:
    | "full-time"
    | "part-time"
    | "contract"
    | "temporary"
    | "internship"
    | null;
  category: string | null;
  experienceLevel: "entry" | "mid-level" | "senior" | "executive" | null;
  educationRequirement: string | null;
  skills: string[] | null;
  deadline: string | null;
  contactEmail: string | null;
  companyWebsite: string | null;
  applicationProcess: string | null;
  workSchedule: string | null;
  tags: string[] | null;
}

type JobState = {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  selectedJobId: number | null;
  filters: {
    category: string | undefined | null;
    employmentType: string | undefined | null;
    experienceLevel: string | undefined | null;
    location: string | undefined | null;
  };
  pagination: {
    currentPage: number | null;
    totalPages: number | null;
    itemsPerPage: number | null;
  };
  postedJob: Job[];
};

const loadState = (): JobState | undefined => {
  try {
    const serializedState = localStorage.getItem("jobState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: JobState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("jobState", serializedState);
  } catch {
    // Ignore write errors
  }
};

const initialState: JobState = loadState() || {
  jobs: [],
  isLoading: false,
  error: null,
  selectedJobId: null,
  filters: {
    category: null,
    employmentType: null,
    experienceLevel: null,
    location: null,
  },
  pagination: {
    currentPage: null,
    totalPages: null,
    itemsPerPage: null,
  },
  postedJob: []
};

export const postJob = createAsyncThunk(
  "jobs",
  async (
    {
      jobsData,
      token, // External argument added here
    }: {
      jobsData: {
        jobTitle: string;
        description: string;
        companyName: string;
        location: string;
        EmploymentType: string;
        category: string;
        experienceLevel: string;
        educationRequirement: string;
        skills: string[];
        deadline: string;
        contactEmail: string;
        companyWebsite: string;
        applicationProcess: string;
        workSchedule: string;
        tags: string[];
      };
      token: string; // External argument type
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await axios.post(
        "https://dsiqhip3ye.ap-southeast-1.awsapprunner.com/jobs",
        jobsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getJobs = createAsyncThunk(
  "getJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/jobs");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedJobId: (state, action: PayloadAction<number | null>) => {
      state.selectedJobId = action.payload;
    },
    setFilters: (state, action: PayloadAction<typeof initialState.filters>) => {
      state.filters = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<typeof initialState.pagination>
    ) => {
      state.pagination = action.payload;
    },
    clearJobs: (state) => {
      state.jobs = [];
    },
    hydrate: (state, action: PayloadAction<JobState>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        (state.isLoading = true), (state.error = null);
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.pagination.currentPage = action.payload.currentPage;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.itemsPerPage = action.payload.itemsPerPage;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { hydrate } = jobSlice.actions;
export default jobSlice.reducer;
