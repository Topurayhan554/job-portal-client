import React from "react";

const JobCardSkeleton = () => {
  return (
    <div className="card-theme border rounded-2xl p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-theme-primary/20 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-theme-primary/25 rounded w-3/4" />
          <div className="h-3 bg-theme-primary/15 rounded w-1/2" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <div className="h-5 bg-theme-primary/15 rounded-full w-16" />
        <div className="h-5 bg-theme-primary/15 rounded-full w-20" />
      </div>
      <div className="border-t border-theme pt-3 flex justify-between">
        <div className="h-4 bg-theme-primary/20 rounded w-20" />
        <div className="h-4 bg-theme-primary/15 rounded w-14" />
      </div>
    </div>
  );
};

export default JobCardSkeleton;
