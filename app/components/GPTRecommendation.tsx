/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { motion } from "framer-motion"; // For animations
import { Textarea } from "@/components/ui/textarea";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import api from '@/lib/http';
import { Movie } from './Movie';
import { useAuthStore } from '../store';
import Link from 'next/link';

const AISearchBox = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recommendedMovie, setRecommendedMovie]: any = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuthStore(); 

  const handleSearch = async () => {
    console.log("Search triggered with query:", searchQuery);

    try {
      const response = await api("/movies/gpt", {
        method: "POST",
        data: JSON.stringify({
          prompt: searchQuery,
        }),
      });
      setRecommendedMovie(response.data);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendedMovie(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        className="p-6 flex items-center justify-center rounded-lg shadow-md bg-white text-black mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg">
          Please <Link href="/login" className="font-bold underline">login</Link> to use our AI-powered recommendation search. <FaWandMagicSparkles className='inline' size={24} />
        </p>
      </motion.div>
    );
  }

  return (
    <>
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
          className="ml-4 w-full p-4 rounded-lg bg-gray-100 text-black"
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
              className="p-4 rounded-lg shadow-md text-black mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-4">Recommended Movies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {recommendedMovie.map((movie: any) => (
                  <div key={movie.id} className="p-4 bg-white rounded-lg shadow">
                    <h4 className="text-md font-semibold mb-2">{movie.title}</h4>
                    {movie.poster_path && <Movie {...movie} />}
                    <p className="text-sm mb-2">
                      <span className="inline-block bg-yellow-300 text-black px-2 py-1 rounded-md font-bold">
                        IMDb Score: {movie.vote_average}
                      </span>
                    </p>
                    <p className="text-sm mt-2 p-2 rounded-md h-20">
                      <div className="line-clamp-3">
                        <strong>Description:</strong> {movie.overview}
                      </div>
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </>
  );
};

export default AISearchBox;
