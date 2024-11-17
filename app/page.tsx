/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import "@aws-amplify/ui-react/styles.css";
import Footer1 from "./components/Footer";
import GenreGrid from "./components/Genres";
import { MovieListWithSidePagination } from "./components/MoviesListWithSidePagination";
import NavigationBar from "./components/navbar/navBar";
import { useEffect, useState } from "react";
import api from "@/lib/http";
import { useAuthStore } from "./store";
import AISearchBox from "./components/GPTRecommendation";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null); // Start with null for loading state
  const [mostLikedMovies, setMostLikedMovies] = useState(null);

  const { isAuthenticated, name: userName } = useAuthStore();

  useEffect(() => {
    async function fetchMovies() {
      const [updatedTrendingMovies, updatedMostLikedMovies] = await fetchData();
      setMostLikedMovies(updatedMostLikedMovies);
      setTrendingMovies(updatedTrendingMovies);
    }
    fetchMovies();
  }, [isAuthenticated, userName]);

  return (
    <main className="container mx-auto">
      <NavigationBar />

      <AISearchBox />

      {/* Pass loading state to MovieListWithSidePagination */}
      <MovieListWithSidePagination
        title="Trending Movies"
        subtitle="Movies that are most popular across the world right now"
        movies={trendingMovies}
        loading={!trendingMovies} // Skeleton shown until data is loaded
      />

      <MovieListWithSidePagination
        title="Most Liked Movies"
        subtitle="Movies most liked by findamovie users"
        movies={mostLikedMovies}
        loading={!mostLikedMovies} // Skeleton shown until data is loaded
      />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Browse By Genre</h2>
        <GenreGrid />
      </div>

      <Footer1 />
    </main>
  );
};

export default HomePage;

async function fetchData() {
  const [trendingResponse, mostLikedResponse] = await Promise.all([
    api("/movies/trending"),
    api("/users/mostAdded"),
  ]);
  const trendingMovies = await trendingResponse.data;
  const mostLikedMovies = await mostLikedResponse.data;

  return [trendingMovies, mostLikedMovies.movies.map((movie: any) => movie.details)];
}
