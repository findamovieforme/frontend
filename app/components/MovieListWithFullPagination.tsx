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

type MovieData = {
  id: number;
  title: string;
  posterUrl: string;
  seasonInfo?: string;
  isLiked: boolean
};

type MovieListWithFullPaginationProps = {
  title: string;
  movies: MovieData[];
  subtitle?: string;
  itemsPerPage?: number;
};

export function MovieListWithFullPagination({
  title,
  subtitle,
  movies,
  itemsPerPage = 8, // Default to 8 movies per page
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
      <Pagination className="mt-6 flex justify-center">
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>

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

          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  );
}
