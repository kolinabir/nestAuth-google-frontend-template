import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BuildingIcon, MapPinIcon } from "lucide-react";
import React from "react";

interface JobDetailsModalProps {
 jobTitle:string|null;
 companyName:string|null;
 location:string|null;
 EmploymentType:string|null;
 description:string|null;
}

// Corrected function declaration for JobDetailsModal
const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ jobTitle,companyName,location,EmploymentType,description }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Job Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{jobTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <BuildingIcon className="h-4 w-4" />
            <span>{companyName}</span>
            <MapPinIcon className="h-4 w-4 ml-2" />
            <span>{location}</span>
          </div>
          <div className="text-lg font-semibold">
            <span className="text-muted-foreground">Salary Range</span>
            <p>$120,000 - $160,000 per year</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Job Description</h3>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Requirements</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              <li>5+ years of experience with React.js and its ecosystem</li>
              <li>Strong proficiency in JavaScript, including ES6+ features</li>
              <li>Experience with state management libraries (e.g., Redux, MobX)</li>
              <li>Familiarity with RESTful APIs and GraphQL</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
