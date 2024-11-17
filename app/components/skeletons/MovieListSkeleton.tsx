import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type MovieListSkeleton = {
  title: string;
};

export const MovieListSkeleton = ({ title }: MovieListSkeleton) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <h3 className="mb-6 text-sm text-gray-500">
        Loading movies that are trending across the world right now...
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-56 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};
