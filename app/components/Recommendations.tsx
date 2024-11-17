'use client'
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "./Movie"; // Import the Movie component

type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  genre_ids: number[];
  popularity: number;
  poster_path: string;
  release_date: string; // ISO format "YYYY-MM-DD"
  title: string;
  overview: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isLiked: boolean;
}

type MovieListWithSidePaginationProps = {
  title: string;
  movies: Movie[];
  subtitle?: string;
};

export function MovieListWithSidePagination({
  title,
  subtitle,
  movies,
}: MovieListWithSidePaginationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mt-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {subtitle && <h3 className="mb-6 text-sm text-gray-500">{subtitle}</h3>}

      {/* Scrollable Container */}
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
          {movies?.map((movie) => {
            if (!movie) return
            return <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              isLiked={movie.isLiked}
              adult={movie.adult}
              backdrop_path={movie.backdrop_path}
              genre_ids={movie.genre_ids}
              popularity={movie.popularity}
              original_title={movie.original_title}
              overview={movie.overview}
              video={movie.video}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
            />
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
