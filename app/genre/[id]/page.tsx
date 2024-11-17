"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/http";
import NavigationBar from "@/app/components/navbar/navBar";
import Footer1 from "@/app/components/Footer";
import { MovieI } from "@/app/interfaces";
import { MovieListWithFullPagination } from "@/app/components/MovieListWithFullPagination";
import { MovieListSkeleton } from '@/app/components/skeletons/MovieListSkeleton'
const GenrePage = () => {
  const genreTitle = "Trending";
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api(`/movies/trending`);
        const fetchedMovies = await response.data;

        setMovies(fetchedMovies || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <NavigationBar />

      {loading ? (
        <MovieListSkeleton title={`${genreTitle} Movies`} />
      ) : (
        <MovieListWithFullPagination
          title={`${genreTitle} Movies`}
          movies={movies}
            subtitle={`${genreTitle} Movies that are trending across the world right now`}
          />
      )}

      <Footer1 />
    </div>
  );
};

export default GenrePage;
