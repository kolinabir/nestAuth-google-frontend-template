export interface JobListParams {
  page?: number;
  limit?: number;
  jobTitle?: string;
  jobID?: string;
  isApproved?: boolean;
  companyName?: string;
  isRejected?: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  education: string[];
  experience: string[];
  createdAt: string;
  updatedAt: string;
}

interface AppliedUser {
  appliedAt: string;
  cvLink: string;
  coverLetter: string;
  email: string;
  phoneNo: string;
  additionalQuestionsAnswers: string[];
  userID: string;
}

interface Job {
  _id: string;
  jobID: string;
  postedBy: User;
  jobTitle: string;
  description: string;
  companyName: string;
  location: string;
  EmploymentType: string;
  category: string;
  experienceLevel: string;
  isApproved: boolean;
  educationRequirement: string;
  skills: string[];
  languageRequirements: string[];
  deadline: string;
  contactEmail: string;
  companyWebsite: string;
  applicationProcess: string;
  benefits: string[];
  isPublished: boolean;
  workSchedule: string;
  companyCulture: string[];
  interviewProcess: string[];
  additionalQuestions: string[];
  tags: string[];
  appliedUsers: AppliedUser[];
  isBoosted: boolean;
  problemTests: any[]; // You might want to define a more specific type for problem tests
  createdAt: string;
  updatedAt: string;
  __v: number;
  publishedAt?: string;
  isRejected?: boolean;
  rejectedReason?: string;
}

export interface JobListResponse {
  data: Job[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}
