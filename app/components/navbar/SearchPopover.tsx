import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/http";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface Movie {
  id: number;
  title: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false); // Popover visibility state
  const router = useRouter();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        setLoading(false);
        setIsPopoverOpen(false); // Close popover if search term is empty
        return;
      }

      setLoading(true);
      setIsPopoverOpen(true); // Open popover when search begins
      try {
        const { data } = await api(`/movies/search?movieName=${searchTerm}`);
        setSearchResults(data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsPopoverOpen(true); // Ensure popover opens when typing starts
  };

  const handleResultClick = (movieId: number) => {
    setSearchTerm("");
    setIsPopoverOpen(false); // Close popover on selection
    router.push(`/movie/${movieId}`);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}> {/* Control popover visibility */}
      <PopoverTrigger asChild>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsPopoverOpen(true)} // Open popover on focus
          placeholder="Search movies..."
          className="px-4 py-2 border rounded-lg text-gray-800 w-64"
        />
      </PopoverTrigger>
      <PopoverContent onOpenAutoFocus={(e) => e.preventDefault()} className="w-full max-w-xs p-2">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <ul className="max-h-48 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleResultClick(movie.id)}
                >
                  {movie.title}
                </li>
              ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              )}
            </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
