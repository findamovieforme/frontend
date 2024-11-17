"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/http";
import NavigationBar from "@/app/components/navbar/navBar";
import Footer1 from "@/app/components/Footer";
import { MovieI } from "@/app/interfaces";
import { MovieListWithFullPagination } from "../components/MovieListWithFullPagination";
import { MovieListSkeleton } from "../components/skeletons/MovieListSkeleton";

const MostLikedPage = () => {
  const genreTitle = "Most Liked";
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api(`/users/mostAdded`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedMovies = await response.data?.movies.map((movieInfo: { details: any }) => {
          return {
            ...movieInfo.details,
          };
        });

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
      {loading ? <MovieListSkeleton title={`${genreTitle} Movies`} /> : 
      <MovieListWithFullPagination
        title={`${genreTitle} Movies`}
        movies={movies}
          subtitle={`Movies that are most liked by our users`}
        />}
      <Footer1 />
    </div>
  );
};

export default MostLikedPage;
