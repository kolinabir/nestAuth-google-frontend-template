import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { AppliedJobs } from "@/redux/api/jobApi/jobAPi.interface";
import { Skeleton } from "../ui/skeleton";

const AppliedJobCard: React.FC<{ job: AppliedJobs }> = ({ job }) => {
  const requirement = [job.EmploymentType, job.location, job.experienceLevel];

  function replaceRangeWithK(input: string) {
    // Match numbers with optional commas in the input string
    const regex = /\d{1,3}(,\d{3})*/g;

    // Replace the last three digits of each matched number with "k"
    return input?.replace(regex, (match) => {
        const numStr = match.replace(/,/g, ''); // Remove commas
        if (numStr.length <= 3) {
            return 'k';
        }
        return numStr.slice(0, -3) + 'k';
    });
}

  return (
    <Card className="w-full max-w-sm flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center">
          <svg
            className=" text-white w-8 h-8"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect height="12" width="4" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{job.companyName}</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            New York, US
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 flex-1 pb-3">
        <h3 className="text-xl font-bold">{job.jobTitle}</h3>
        <div className="flex gap-2">
          {requirement.map((req, index) => (
            <Badge
              key={index}
              variant="outline"
              className="rounded-md text-[12px] sm:text-sm"
            >
              {req}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-dark-gray font-medium">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-[12px] bg-gray-100"
            >
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-medium text-dark-gray">
            {replaceRangeWithK(job.salaryRange)}
            <span className="text-sm font-normal text-muted-foreground">
              /month
            </span>
          </div>
          <p className="font-medium text-gray-700">25 Jan 2025</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
          <Button className="flex-1 bg-dark-gray/90 hover:bg-dark-gray/80">
            View Details
          </Button>
          {/* <Button className="flex-1 bg-dark-gray hover:bg-dark-gray/90">
            Applied
          </Button> */}
          <Button className="flex-1 bg-primary/90 hover:bg-primary/80">
            Applied
          </Button>
      </CardFooter>
    </Card>
  );
};

export default AppliedJobCard;
