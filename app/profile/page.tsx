/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import NavigationBar from "../components/navbar/navBar";


export default function ProfilePage() {
  // const [likedMovies] = useState(initialMovies);

  const username = 'dotel'

  return (
    <div>
      <div className="container mx-auto py-8">
        <NavigationBar />

        <h2 className="text-xl text-end">Hello {username}</h2>
        {/* Favorites List */}
        {/* <MovieListWithFullPagination
          movies={likedMovies}
          title="Your Favorites"
          subtitle="Here are some of your favorites so far"
        /> */}
      </div>
    </div>
  );
}
