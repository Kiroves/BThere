import React from "react";
import { Skeleton } from "./ui/skeleton";
const YSkel = () => {
  return (
    <div className="flex items-center space-x-4 max-w-lg">
      <Skeleton className="h-12 w-12 rounded-full lg:h-[50px] lg:w-[50px] bg-yellow-500" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-sm sm:w-[300px] lg:h-[20px] lg:w-96 bg-yellow-500" />
        <Skeleton className="h-4 w-[200px] sm:w-[250px] lg:h-[20px]  bg-yellow-500" />
      </div>
    </div>
  );
};

export default YSkel;
