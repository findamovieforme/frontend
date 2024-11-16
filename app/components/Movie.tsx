import React from "react";

import Link from "next/link";
import { MovieI } from "../interfaces";

export function Movie(movie: MovieI) {
  const { id, title, ...rest } = movie;
  return (
      <div className="relative min-w-[200px] bg-gray-800 rounded-lg shadow-md overflow-hidden h-40">
      {/* Heart Icon Button */}

      <Link href={`/movie/${id}`}>

      {/* Movie Poster and Details */}
      <img
          src={rest.poster_path}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
          {rest.release_date && <p className="text-sm text-gray-300">{rest.release_date}</p>}
      </div>
      </Link>

    </div>

  );
}
