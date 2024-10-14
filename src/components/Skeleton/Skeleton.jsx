import React from "react";

const Skeleton = () => {
  return (
    <div className="flex flex-col mb-8">
      <div className="relative md:rounded-xl overflow-hidden animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded-md mb-2"></div>
        <span className="absolute bottom-4 right-0 bg-gray-300 text-transparent text-xs p-1 m-1 rounded">
          Loading...
        </span>
      </div>

      <div className="flex mt-1">
        <div className="flex h-9 w-9 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gray-200 rounded-md"></div>
        </div>

        <div className="flex flex-col ml-3 overflow-hidden bg-gray-200 text-transparent rounded-md">
          <div className="h-6 w-3/4 bg-gray-300 rounded mb-1 animate-rhythm1"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded mb-1 animate-rhythm2"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded animate-rhythm3"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
