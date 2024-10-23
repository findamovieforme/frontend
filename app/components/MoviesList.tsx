// components/MoviesList.tsx
import { ChevronRight } from "lucide-react";
import React from "react";

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  seasonInfo?: string;  // Optional field for season/year info
};

type MoviesListProps = {
  title: string;
  movies: Movie[];
  subtitle: string;
};

export function MoviesList({ title, subtitle, movies }: MoviesListProps) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">{title}
        <ChevronRight size={24} className="inline-block ml-2" />
      </h2>
      <h3 className="mb-6 text-sm text-gray-500">{subtitle}</h3> {/* Updated subtitle */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden w-full h-40"> {/* Fixed height */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover" // Ensures image scales within container
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
              <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
              {movie.seasonInfo && (
                <p className="text-sm text-gray-300">{movie.seasonInfo}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
