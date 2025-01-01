import React from 'react';
import { Skeleton } from '../ui/skeleton';

const JobCardSkeleton = () => {
    return (
        <div className="w-full mx-auto p-6 space-y-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded" />
          <div>
            <Skeleton className="h-5 w-40 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-6 w-6" />
      </div>
      
      <Skeleton className="h-4 w-3/4" />
      
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-6 w-20" />
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
    );
};

export default JobCardSkeleton;