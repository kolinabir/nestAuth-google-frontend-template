import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const SkeletonJobCard = () => {
  return (
    <Card className="w-full max-w-md bg-[#F5F5F5] overflow-hidden">
        <CardHeader className="flex flex-row items-start space-x-4 pb-4">
          <Skeleton className="h-12 w-12 rounded-md bg-gray-200" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-5/6 bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
            <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
            <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
            <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-4">
          <Skeleton className="h-6 w-24 bg-gray-200" />
          <Skeleton className="h-10 w-24 rounded-md bg-gray-200" />
        </CardFooter>
      </Card>
  );
};

export default SkeletonJobCard;
