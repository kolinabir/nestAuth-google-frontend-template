import React from "react";
import logo from "/public/slack.png";
import {
  Form,
  Select,
  Layout,
  Typography,
  Flex,
  Input,
  Spin,
  Tag,
  Pagination,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { BriefcaseIcon } from "../component/adminPanel/Icons/BriefcaseIcon";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { BookmarkIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Job } from "@/store/api/api/jobApi/jobAPi.interface";
const { Text, Title } = Typography;

interface JobCardProps {
  job: Job;
  setSelectedJob: (job: Job) => void;
}

const JobCard: React.FC<{ job: Job; onSelect: (job: Job) => void }> = ({
  job,
  onSelect,
}) => {
  return (
    <Card
      key={job.jobID}
      onClick={() => onSelect(job)}
      className="min-w-full px-0 shadow-sm hover:shadow-md transition-shadow z-20"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 relative">
            <Image
              src={logo}
              alt="Slack logo"
              layout="fill"
              className="rounded-md border"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg hover:text-primary/75">
              {job.jobTitle}
            </h3>
            <p className="text-sm text-gray-500">{job.companyName}</p>
          </div>
        </div>
        <Button variant={"ghost"} size={"icon"} className="text-blue-500">
          <BookmarkIcon className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-base text-gray-500">{job.description}</p>
        <div className=" flex flex-wrap items-center gap-2 md:gap-4 mt-4 ">
          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
            {job.EmploymentType}
          </span>
          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
            {job.location}
          </span>
          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
            {job.experienceLevel}
          </span>
          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
            {job.educationRequirement}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-col md:flex-row items-start gap-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-base font-medium">
              {job.salaryRange}{" "}
              <small className="text-xs text-gray-500">/Month</small>
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <UsersIcon className="text-gray-500 w-4 h-4" />
            <span className="text-base font-medium">
              {job.totalApplicants}{" "}
              <small className="text-xs text-gray-500">People applied</small>
            </span>
          </div>
        </div>
        <Button className="bg-primary/90 hover:bg-primary">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
