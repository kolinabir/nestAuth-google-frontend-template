export interface JobQueryParams {
  jobTitle?: string;
  location?: string;
  employmentType?: EmploymentType[];
  category?: string[];
  experienceLevel?: ExperienceLevel[];
  skills?: string[];
  page?: number;
  limit?: number;
}

export interface AppliedJobs {
  jobId: string;
  jobTitle: string;
  location: string;
  companyName: string;
  //todo: add company logo 
  EmploymentType: EmploymentType;
  category: string;
  experienceLevel: ExperienceLevel;
  skills: string[];
  createdAt: Date;
  deadline: Date;
  description: string;
  salaryRange: string;
}

export enum EmploymentType {
  // Define your employment types here
  // Example:
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
  FREELANCE = "Freelance",
  // ...
}

export enum ExperienceLevel {
  FRESH_GRADUATE = "Fresh Graduate",
  ENTRY_LEVEL = "Entry Level",
  MID_LEVEL = "Mid Level",
  SENIOR_LEVEL = "Senior Level",
  ONE_TO_TWO_YEARS = "1-2 Years",
  TWO_TO_THREE_YEARS = "2-3 Years",
  THREE_TO_FOUR_YEARS = "3-4 Years",
  THREE_TO_FIVE_YEARS = "3-5 Years",
  SIX_TO_NINE_YEARS = "6-9 Years",
}
export interface Job {
  jobID: string;
  jobTitle: string;
  description: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  EmploymentType: string;
  salaryRange?: string;
  category: string;
  experienceLevel: string;
  educationRequirement?: string;
  skills: string[];
  totalApplicants: number;
  deadline: string;
  postedBy: any; // You might want to define a more specific type for the user object
}

export interface JobResponse {
  jobs: Job[];
  totalPages: number;
  totalJobs: number;
  currentPage: number;
  limit: number;
}