/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.js
"use client";
import "@aws-amplify/ui-react/styles.css";
import Footer1 from "./components/Footer";
import GenreGrid from "./components/Genres";
import { MovieListWithSidePagination } from "./components/MoviesListWithSidePagination";
import NavigationBar from "./components/navbar/navBar";
import { useEffect, useState } from "react";
import api from "@/lib/http";
import { useAuthStore } from "./store";
import { motion } from "framer-motion"; // For animations
import { Textarea } from "@/components/ui/textarea";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { Movie } from "./components/Movie";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [mostLikedMovies, setMostLikedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedMovie, setRecommendedMovie]: any = useState(null);

  const { isAuthenticated, name: userName } = useAuthStore();

  useEffect(() => {
    async function fetchMovies() {
      const [updatedTrendingMovies, updatedMostLikedMovies] = await fetchData();
      setMostLikedMovies(updatedMostLikedMovies);
      setTrendingMovies(updatedTrendingMovies);
    }
    fetchMovies();
  }, [isAuthenticated, userName]);

  const handleSearch = async () => {
    console.log("Search triggered with query:", searchQuery);


    try {
      const response = await api("/movies/gpt", {
        method: "POST",
        data: JSON.stringify({
          prompt: searchQuery,
        })
      });
      setRecommendedMovie(response.data); // Assuming the API returns a single movie recommendation
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendedMovie(null);
    }
  };

  return (
    <main className="container mx-auto">
      <NavigationBar />
      {/* AI Search Box */}
      <motion.div
        className="p-6 flex items-center rounded-lg shadow-md bg-white text-black mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="p-2 flex items-center justify-center"
          onClick={handleSearch}
          title="Get Recommendation"
        >
          <FaWandMagicSparkles size={24} />
        </button>
        <Textarea
          placeholder="🎥 Describe the vibe of your perfect movie 🌟 and we'll find the magic for you ✨🎬"
          className="ml-4 w-full p-4 rounded-lg bg-gray-100 text-black "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      </motion.div>

      {recommendedMovie && (
        <Collapsible open>
          <CollapsibleTrigger className="p-2 bg-black text-white rounded-md hover:bg-gray-800">
            Show/Hide Recommended Movies
          </CollapsibleTrigger>
          <CollapsibleContent>
            <motion.div
              className="p-4 rounded-lg shadow-md  text-black mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-4">Recommended Movies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {recommendedMovie.map((movie: any) => (
                  <div key={movie.id} className="p-4 bg-white rounded-lg shadow">
                    <h4 className="text-md font-semibold mb-2">{movie.title}</h4>
                    {movie.poster_path && (
                      <Movie {...movie} />
                    )}
                    <p className="text-sm mb-2">
                      <span className="inline-block bg-yellow-300 text-black px-2 py-1 rounded-md font-bold">
                        IMDb Score: {movie.vote_average}
                      </span>
                    </p>
                    <p className="text-sm mt-2  p-2 rounded-md h-20 ">
                      <div className="line-clamp-3">
                        <strong >Description:</strong> {movie.overview}
                      </div>
                    </p>

                  </div>
                ))}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <MovieListWithSidePagination
        title="Trending Movies"
        subtitle="Movies that are most popular across the world right now"
        movies={trendingMovies}
      />
      <MovieListWithSidePagination
        title="Most Liked Movies"
        subtitle="Movies most liked by findamovie users"
        movies={mostLikedMovies}
      />
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Browse By Genre</h2>
      </div>
      <GenreGrid />
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
