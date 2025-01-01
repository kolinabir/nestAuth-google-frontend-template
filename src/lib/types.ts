export interface AvgReview {
    clarityAndCommunication: number;
    studentEngagement: number;
    studentFriendliness: number;
    industryKnowledge: number;
    leadershipAndManagement: number;
    moralityAndEthics: number;
    positivityAndMotivation: number;
    devotionAndAvailability: number;
    timeliness: number;
    teachingMethodsAndInnovation: number;
    classEngagementAndPracticalApplication: number;
    studentSatisfaction: number;
    subjectKnowledge: number;
  }
  
  export interface TypeTeacher {
    _id: string;
    name: string;
    department: string;
    link: string;
    initial: string;
    email: string;
    phone: string;
    Faculty: string;
    designation: string;
    picture: string;
    employeeId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    reviewCount: number;
    totalScore: number;
    avgReview: AvgReview;
  }
  