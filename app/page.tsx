/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.js
"use client"
import '@aws-amplify/ui-react/styles.css';
import Footer1 from './components/Footer';
import GenreGrid from './components/Genres';
import { MovieListWithSidePagination } from './components/MoviesListWithSidePagination';
import NavigationBar from './components/navbar/navBar';
import { useEffect, useState } from 'react';
import api from '@/lib/http';
import { useAuthStore } from './store';

// Define HomePage as a server component
const HomePage = () => {
  // Fetch data from APIs
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [mostLikedMovies, setMostLikedMovies] = useState([]);

  const { isAuthenticated, name: userName } = useAuthStore()


  useEffect(() => {
    async function fetchMovies() {
      const [updatedTrendingMovies, updatedMostLikedMovies] = await fetchData();
      setMostLikedMovies(updatedMostLikedMovies);
      setTrendingMovies(updatedTrendingMovies);
    }
    fetchMovies();
  }, [isAuthenticated, userName]);


  useEffect(() => {
    fetchData().then(([updatedTrendingMovies, updatedMostLikedMovies]) => {
      setTrendingMovies(updatedTrendingMovies);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMostLikedMovies(updatedMostLikedMovies);
    });
  }, [isAuthenticated, userName]);

  return (
    <main className="container mx-auto">
      <NavigationBar />
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
      api('/movies/trending'),
      api('/users/mostAdded'),
    ]);
    const trendingMovies = await trendingResponse.data;
    const mostLikedMovies = await mostLikedResponse.data;

  return [trendingMovies, mostLikedMovies.movies.map((movie: any) => movie.details)];

}
