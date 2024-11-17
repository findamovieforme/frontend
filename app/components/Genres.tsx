"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import api from '@/lib/http';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  posterPath: string;
}

const CategoryCard: FC<Category> = ({ name, posterPath }: { name: string, posterPath: string }) => (
  <div className="h-36 relative group overflow-hidden rounded-lg shadow-lg">
    <img
      src={posterPath}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
    <h3 className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold z-10">
      {name}
    </h3>
  </div>
);

const GenreGrid: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api('/movies/genres');
        const genres = response.data?.map((genre: any) => ({
          id: genre.id,
          name: genre.name,
          posterPath: genre.posterPath,
        }));
        setCategories(genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Failed to fetch genres.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <p>Loading genres...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="cursor-pointer grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {categories?.map((category, index) => (
        <Link key={index} href={{
          pathname: `/genre/${category.id}`, // Dynamic route
          query: { genreTitle: category.name }, // Query parameter
        }} >
          <CategoryCard key={index} id={category.id} name={category.name} posterPath={category.posterPath} />
        </Link>
      ))}
    </div>
  );
};

export default GenreGrid;
