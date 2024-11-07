import React, { useState } from "react";
import { Heart } from "lucide-react"; // Heart icon from lucide-react
import api from "@/lib/http";
import { useAuthStore } from "../store";
import Link from "next/link";

type MovieProps = {
  id: number;
  title: string;
  posterUrl: string;
  seasonInfo?: string;
  isLiked: boolean
};


export function Movie({ title, posterUrl, seasonInfo, id, isLiked, ...rest }: MovieProps) {
  const [liked, setLiked] = useState(isLiked);
  const { name: userId } = useAuthStore()

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);

    api(`https://api.findamovie.me/users/preferences?user_id=${userId}`, {
      method: 'GET',
      headers: {},
    })
      .then((userResponse) => {
        const userPreferences = userResponse.data.preferences || [];

        let updatedPreferences;

        if (!liked) {
          // Add the movie to preferences if it is liked
          updatedPreferences = [
            ...userPreferences,
            { title, posterUrl, seasonInfo, id, isLiked: true, ...rest },
          ];
        } else {
          // Remove the movie from preferences if it is unliked
          updatedPreferences = userPreferences.filter((movie: { id: number }) => movie.id !== id);
        }

        // Send the updated preferences to the API
        return api("/users/preferences", {
          method: "POST",
          data: JSON.stringify({
            user_id: userId,
            movies: updatedPreferences,
          }),
        });
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          // Handle 404 - No preferences found, start with an empty array
          const updatedPreferences = !liked
            ? [
              { title, posterUrl, seasonInfo, id, isLiked: true, ...rest },
            ]
            : [];

          // Send the updated preferences to the API
          return api("/users/preferences", {
            method: "POST",
            data: JSON.stringify({
              user_id: userId,
            movies: updatedPreferences,
          }),
        });
      } else {
        console.error("Error updating preferences:", error);
      }
    });
  };


  return (
      <div className="relative min-w-[200px] bg-gray-800 rounded-lg shadow-md overflow-hidden h-40">
      {/* Heart Icon Button */}
      <button
        onClick={toggleLike}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors"
        aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={20}
          className={liked ? "text-red-500" : "text-gray-500"} // Red if liked, gray if not
          fill={liked ? "currentColor" : "none"} // Fill with red if liked
        />
      </button>
      <Link href={`/movie/${id}`}>

      {/* Movie Poster and Details */}
      <img
        src={posterUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {seasonInfo && <p className="text-sm text-gray-300">{seasonInfo}</p>}
      </div>
      </Link>

    </div>

  );
}
