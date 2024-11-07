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
    fetchData(isAuthenticated, userName).then(([updatedTrendingMovies, updatedMostLikedMovies]) => {
      console.log(trendingMovies, 'trendingMovies');
      setTrendingMovies(updatedTrendingMovies);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMostLikedMovies(updatedMostLikedMovies.map((movie: any) => movie.details));
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

// Helper function to fetch data
// Helper function to fetch data
async function fetchData(isAuthenticated: boolean, userName: string | null) {
  try {
    const [trendingResponse, mostLikedResponse] = await Promise.all([
      api('/movies/trending'),
      api('/users/mostAdded'),
    ]);

    const trendingMovies = await trendingResponse.data;
    const mostLikedMovies = await mostLikedResponse.data;

    let userPreferences = [];

    if (isAuthenticated) {
      try {
        const userResponse = await api(
          `https://api.findamovie.me/users/preferences?user_id=${userName}`,
          {
            method: 'GET',
            headers: {},
          }
        );
        userPreferences = await userResponse.data.preferences;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          userPreferences = [];
        } else {
          throw error; // Re-throw other errors
        }
      }
    }

    // Extract movie IDs from user preferences
    const likedMovieIds = new Set(userPreferences.map((pref: any) => pref.id));
    // Add isLiked property to trendingMovies
    const updatedTrendingMovies = trendingMovies.map((movie: any) => {
      console.log(likedMovieIds.has(movie.id))
      return {
        ...movie,
        isLiked: likedMovieIds.has(movie.id),
      }
    });

    // Add isLiked property to mostLikedMovies
    const updatedMostLikedMovies = mostLikedMovies.movies.map((movie: any) => ({
      ...movie,
      isLiked: likedMovieIds.has(movie.id),
    }))


    return [updatedTrendingMovies, updatedMostLikedMovies];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [[], []]; // Return empty arrays in case of error
  }
}
