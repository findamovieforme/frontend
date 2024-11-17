'use client';
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { MovieI } from "../interfaces";
import { Movie } from "./Movie";



type MovieListWithSidePaginationProps = {
  title: string;
  movies?: MovieI[] | null; 
  subtitle?: string;
  loading?: boolean;
};

export function MovieListWithSidePagination({
  title,
  subtitle,
  movies = null,
  loading = false,
}: MovieListWithSidePaginationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, 
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, 
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mt-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {subtitle && <h3 className="mb-6 text-sm text-gray-500">{subtitle}</h3>}

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide"
        >
          {loading
            ?
            Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-28 rounded-md" />
            ))
            :
            movies?.map((movie) => {
              if (!movie) return null;
              return <Movie key={movie.id} {...movie} />;
            })}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
