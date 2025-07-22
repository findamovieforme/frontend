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
    if (!isAuthenticated || !userId) {
      setMovies([]);
      return;
    }

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <NavigationBar />

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Your profile</h1>
            <p className="text-sm text-gray-500">
              {isAuthenticated
                ? `Signed in as ${userId}`
                : "Sign in to save favorites and get personalized recommendations."}
            </p>
          </div>
        </div>

        {isAuthenticated ? (
          movies.length > 0 ? (
            <MovieListWithFullPagination
              movies={movies}
              title="Your Favorites"
              subtitle="Here are some of your favorites so far"
            />
          ) : (
            <div className="mt-10 rounded-lg border bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground">
              You haven&apos;t added any favorites yet. Browse movies and tap the{" "}
              <span className="font-medium">heart</span> icon on a title to save it here.
            </div>
          )
        ) : (
          <div className="mt-10 rounded-lg border bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground">
            Please sign in to view and manage your favorite movies.
          </div>
        )}

        <Footer1 />
      </div>
    </div>
  );
}
