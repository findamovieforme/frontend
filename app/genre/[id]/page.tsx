"use client"
import React, { useEffect, useState } from "react";
import { MovieListWithFullPagination } from "../../components/MovieListWithFullPagination";
import api from "@/lib/http";
import { useSearchParams } from "next/navigation";
import NavigationBar from "@/app/components/navbar/navBar";
import Footer1 from "@/app/components/Footer";
import { MovieI } from "@/app/interfaces";


type GenrePageProps = {
  params: {
    id: number
  }
};

const GenrePage: React.FC<GenrePageProps> = (props) => {
  const genreTitle = useSearchParams().get('genreTitle') || 'Trending'
  const [movies, setMovies] = useState<MovieI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const genreID = props.params.id

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api(`/movies/trending?page=1&genreID=${genreID}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedMovies = await response.data

        setMovies(fetchedMovies || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreID]);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto">
      <NavigationBar />

      {/* <h1 className="text-2xl font-bold mb-4">{genreTitle} Movies</h1> */}
      <MovieListWithFullPagination
        title={`${genreTitle} Movies`}
        movies={movies}
        subtitle={`${genreTitle} Movies that are most popular across the world right now`}
      />
      <Footer1 />

    </div>
  );
};


export default GenrePage;
