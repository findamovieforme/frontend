'use client'

import '@aws-amplify/ui-react/styles.css';
import Footer1 from "./components/Footer";
import GenreGrid from "./components/Genres";


import { MoviesList } from "@/app/components/MoviesList";
import NavigationBar from './components/navbar/navBar';


const trendingMovies = [
  { id: "1", title: "Movie A", posterUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" },
  { id: "2", title: "Movie B", posterUrl: "https://image.tmdb.org/t/p/w500/fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg" },
];

const newReleasedMovies = [
  { id: "1", title: "Movie C", posterUrl: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" },
  { id: "2", title: "Movie F", posterUrl: "https://image.tmdb.org/t/p/w500/fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomePage = () => {
  return (
        <main className="container mx-auto">
      <NavigationBar />
          <MoviesList title="Trending Movies" subtitle="Movies with most reactions in the last 3 days" movies={trendingMovies} />
          <MoviesList title="Trending Shows" subtitle="Shows with most reactions in the last 3 days" movies={newReleasedMovies} />
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Browse By Genre</h2>
          </div>
          <GenreGrid />
          <Footer1 />
    </main>
  )
}




export default HomePage;

