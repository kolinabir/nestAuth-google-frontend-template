import { Bookmark, BookmarkIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Job } from "@/store/api/api/jobApi/jobAPi.interface";

const JobDetails: React.FC<{
  job: Job;
  onUnSelect: (job: Job | null) => void;
}> = ({ job, onUnSelect }) => {
  return (
    <div className="p-6 bg-white rounded-md">
      <div className="flex flex-col items-center mb-4 relative border-b-2 pb-4">
        <div className="w-20 h-20 bg-blue-500 rounded-md mr-3 flex items-center justify-center text-white font-bold text-xl my-4">
          {job.companyName[0]}
        </div>
        <div className="text-center">
          <h2 className="font-semibold text-2xl">{job.jobTitle}</h2>
          <p className="text-primary font-semibold text-lg">
            {job.companyName}
          </p>
        </div>
        <span onClick={() => onUnSelect(null)}>
          <X className="absolute right-0 top-0 cursor-pointer" />
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-medium text-dark-gray/70">Job Type</p>
          <p className="font-semibold text-[17px]">{job.EmploymentType}</p>
        </div>
        <div>
          <p className="font-medium text-dark-gray/70">Work Type</p>
          <p className="font-semibold text-[17px]">Remote</p>
        </div>
        <div>
          <p className="font-medium text-dark-gray/70">Location</p>
          <p className="font-semibold text-[17px]">{job.location}</p>
        </div>
        <div>
          <p className="font-medium text-dark-gray/70">Experience</p>
          <p className="font-semibold text-[17px]">{job.experienceLevel}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-medium text-dark-gray/70">Salary</p>
        <p className="font-semibold text-[17px]">{job.salaryRange}</p>
      </div>
      <div className="py-4 border-t-2">
        <h3 className="font-semibold text-[17px] mb-2">Description</h3>
        <ul className="list-disc pl-3 text-base">{job.description}</ul>
      </div>
      <div>
        <h3 className="font-semibold text-[17px] mb-2">Requirements</h3>
        <ul className="list-disc pl-3 text-base">
          {/* {job.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))} */}
          {job.description}
          requirements
        </ul>
      </div>
      <div className="mt-4 pt-6 border-t-2 flex items-center gap-2">
        <Button className="flex-1 bg-primary/90 w-full hover:bg-primary">
          Apply Now
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-blue-500 border"
        >
          <BookmarkIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
