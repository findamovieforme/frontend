"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/http";
import { MovieListSkeleton } from "../components/skeletons/MovieListSkeleton";
import NavigationBar from "../components/navbar/navBar";
import Footer1 from "../components/Footer";
import { MovieListWithFullPagination } from "../components/MovieListWithFullPagination";

const TrendingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await api("/movies/trending");
        setMovies(response.data || []);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="container mx-auto">
      <NavigationBar />

      {loading ? (
        <MovieListSkeleton title="Trending Movies" />
      ) : (
        <MovieListWithFullPagination
            title="Trending Movies"
            movies={movies}
            subtitle="Movies that are trending globally right now."
          />
      )}

      <Footer1 />
    </div>
  );
};

export default TrendingPage;
