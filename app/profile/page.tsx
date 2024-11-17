/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import NavigationBar from "../components/navbar/navBar";
import { MovieI } from "../interfaces";
import api from "@/lib/http";
import { useAuthStore } from "../store";
import { MovieListWithFullPagination } from "../components/MovieListWithFullPagination";
import Footer1 from "../components/Footer";


export default function ProfilePage() {
  const { name: userId, isAuthenticated } = useAuthStore();

  const [movies, setMovies] = useState<MovieI[]>([]);
  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const userPreferences = await api(`/users/preferences?user_id=${userId}`);
        setMovies(userPreferences.data.preferences);
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    }
    fetchUserMovies()
  }, [isAuthenticated]);

  return (
    <div>
      <div className="container mx-auto py-8">
        <NavigationBar />

        <h2 className="text-xl text-end mb-6 text-sm text-gray-500">Hello {userId}</h2>
        <MovieListWithFullPagination
          movies={movies}
          title="Your Favorites"
          subtitle="Here are some of your favorites so far"
        />
        <Footer1 />
      </div>
    </div>
  );
}
