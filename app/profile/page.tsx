/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import NavigationBar from "../components/navbar/navBar";
import { MovieListWithFullPagination } from "../components/MovieListWithFullPagination";

const initialMovies = [
  { id: 2, title: "Movie A", posterUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg", isLiked: false },
  { id: 3, title: "Movie B", posterUrl: "https://image.tmdb.org/t/p/w500/fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg", isLiked: false },
  // Add more mock movies here
];

export default function ProfilePage() {
  const [likedMovies] = useState(initialMovies);

  const username = 'dotel'

  return (
    <div>
      <div className="container mx-auto py-8">
        <NavigationBar />

        <h2 className="text-xl text-end">Hello {username}</h2>
        {/* Favorites List */}
        <MovieListWithFullPagination
          movies={likedMovies}
          title="Your Favorites"
          subtitle="Here are some of your favorites so far"
        />
      </div>
    </div>
  );
}
