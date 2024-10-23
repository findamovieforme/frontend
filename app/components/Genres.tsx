import { FC } from 'react';

interface Category {
  title: string;
  imageUrl: string;
}

const categories: Category[] = [
  { title: 'Action', imageUrl: 'https://image.tmdb.org/t/p/w500/xRWht48C2V8XNfzvPehyClOvDni.jpg' },
  { title: 'Anime', imageUrl: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg' },
  { title: 'Crime', imageUrl: 'https://image.tmdb.org/t/p/w500/tDexQyu6FWltcd0VhEDK7uib42f.jpg' },
  { title: 'Family', imageUrl: 'https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg' },
  { title: 'History', imageUrl: 'https://image.tmdb.org/t/p/w500/fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg' },
  { title: 'Indie', imageUrl: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg' },
  { title: 'Action', imageUrl: 'https://image.tmdb.org/t/p/w500/xRWht48C2V8XNfzvPehyClOvDni.jpg' },
  { title: 'Anime', imageUrl: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg' },
  { title: 'Crime', imageUrl: 'https://image.tmdb.org/t/p/w500/tDexQyu6FWltcd0VhEDK7uib42f.jpg' },
  { title: 'Family', imageUrl: 'https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg' },
  { title: 'History', imageUrl: 'https://image.tmdb.org/t/p/w500/fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg' },
  { title: 'Indie', imageUrl: 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg' },

];

const CategoryCard: FC<Category> = ({ title, imageUrl }) => (
  <div className="h-36 relative group overflow-hidden rounded-lg shadow-lg">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
    <h3 className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold z-10">
      {title}
    </h3>
  </div>
);

const GenreGrid: FC = () => (
  <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {categories.map((category, index) => (
      <CategoryCard key={index} title={category.title} imageUrl={category.imageUrl} />
    ))}
  </div>
);

export default GenreGrid;
