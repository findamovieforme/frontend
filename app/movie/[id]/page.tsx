"use client";

import { useEffect, useState } from "react";
import Footer1 from "@/app/components/Footer";
import NavigationBar from "@/app/components/navbar/navBar";
import Image from "next/image";
import api from "@/lib/http"; // Assuming api is set up as a reusable HTTP client
import Link from "next/link";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genres: { id: number; name: string }[];
  imdb_id: string;
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieDetailPageProps {
  params: { id: string };
}

const MovieDetailPage = ({ params }: MovieDetailPageProps) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data: movieDetails } = await api(`/movies/details?movieID=${params.id}`);
        setMovie(movieDetails);

        const { data: recommendations } = await api("/movies/recommendations", {
          method: "POST",
          data: JSON.stringify({
            title: movieDetails.title,
          })
        });
        setSimilarMovies(recommendations || []);
      } catch (error) {
        console.error("Error fetching movie details or recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params.id]);

  if (loading) {
    return <div className="container mx-auto text-center py-10">Loading...</div>;
  }

  if (!movie) {
    return <div className="container mx-auto text-center py-10">Movie not found.</div>;
  }

  return (
    <div className="container mx-auto">
      <NavigationBar />

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-4">{movie.release_date}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold">IMDb Rating:</span>
            <span className="text-yellow-500 font-bold">{movie.vote_average}</span>
          </div>
          <p className="text-gray-800 mb-4">{movie.overview}</p>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on IMDb
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-6">Similar Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {similarMovies.map((similarMovie) => (
            <Link href={`/movie/${similarMovie.id}`} key={similarMovie.id}>
              <div className="text-center">
              <Image
                src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                alt={similarMovie.title}
                width={300}
                height={450}
                className="rounded-lg shadow-md"
              />
              <p className="text-lg mt-2">{similarMovie.title}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer1 />
    </div>
  );
};

export default MovieDetailPage;
