import React from "react";
import { Movie } from "./Movie"; // Import the Movie component
import { MovieI } from "../interfaces";



type MovieListProps = {
  title: string;
  movies: MovieI[];
  subtitle?: string;
};

export function MovieList({ title, subtitle, movies }: MovieListProps) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {subtitle && <h3 className="mb-6 text-sm text-gray-500">{subtitle}</h3>}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            {...movie}
          />
        ))}
      </div>
    </div>
  );
}
