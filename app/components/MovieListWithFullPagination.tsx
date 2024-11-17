import React, { useState } from "react";
import { MovieList } from "./MovieList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"; // Adjust the import path if necessary
import { MovieI } from "../interfaces";

type MovieListWithFullPaginationProps = {
  title: string;
  movies: MovieI[];
  subtitle?: string;
  itemsPerPage?: number;
};

export function MovieListWithFullPagination({
  title,
  subtitle,
  movies,
  itemsPerPage = 20, // Default to 20 movies per page
}: MovieListWithFullPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <MovieList title={title} subtitle={subtitle} movies={currentMovies} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="mt-6 flex justify-center">
          <PaginationContent>
            {/* Conditionally render Previous button */}
            {movies.length > 10 && (
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} className="cursor-pointer">
                <PaginationLink
                  onClick={() => handlePageChange(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {movies.length > 10 && (
              <PaginationItem className="cursor-pointer">
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
