import GenreGrid from "../components/Genres";

// app/preferences/page.tsx
export default function PreferencesPage() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Pick Your Preferences</h2>
      <h3 className="mb-2">Top Three Genres</h3>
      <GenreGrid />

      <h3 className="mt-6 mb-2">Your Top 5 Movies</h3>
      {/* <MoviesSelection /> */}
    </div>
  );
}
