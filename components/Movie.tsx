import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface MovieProps {
  id: string;
  title: string;
  released: number;
  synopsis: string;
  genre: string;
  image: string;
  favorited?: boolean;
  watchLater?: boolean;
}

export default function Movie({ id, title, released, synopsis, genre, image, favorited = false, watchLater = false }: MovieProps) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean>(favorited);
  const [isWatchLater, setIsWatchLater] = useState<boolean>(watchLater);

  console.log("Movie Image URL:", image);

  // Fetch Favorite & Watch Later Status when component mounts
  useEffect(() => {
    async function fetchStatuses() {
      try {
        const [favResponse, watchLaterResponse] = await Promise.all([
          fetch(`/api/favorites`),
          fetch(`/api/watch-later`),
        ]);

        const rawFavText = await favResponse.text();
        const rawWatchLaterText = await watchLaterResponse.text();

        console.log("Raw Favorites Response:", rawFavText);
        console.log("Raw Watch Later Response:", rawWatchLaterText);

        if (!favResponse.ok) throw new Error(`Failed to fetch favorites: ${rawFavText}`);
        if (!watchLaterResponse.ok) throw new Error(`Failed to fetch Watch Later list: ${rawWatchLaterText}`);

        const favData = JSON.parse(rawFavText);
        const watchLaterData = JSON.parse(rawWatchLaterText);

        setIsFavorite(favData.favorites.some((movie: { id: string }) => movie.id === id));
        setIsWatchLater(watchLaterData.watchLater.some((movie: { id: string }) => movie.id === id));

      } catch (error) {
        console.error("Failed to fetch movie status:", error);
      }
    }

    fetchStatuses();
  }, [id]);

  // Handle Favorite Toggle
  const handleFavorite = async () => {
    if (!session) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(`/api/favorites`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite.");
      }

      setIsFavorite((prev) => !prev);
      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (error) {
      console.error("Error toggling favorite movie:", error);
    }
  };

  // Handle Watch Later Toggle
  const handleWatchLater = async () => {
    if (!session) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const method = isWatchLater ? "DELETE" : "POST";
      const response = await fetch(`/api/watch-later`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update Watch Later.");
      }

      setIsWatchLater((prev) => !prev);
      window.dispatchEvent(new Event("watchLaterUpdated"));
    } catch (error) {
      console.error("Error toggling Watch Later movie:", error);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded shadow-lg border-[#1ED2AF] border-1">
      {/* Movie Image */}
      <img
        src={image}
        alt={title}
        width={500}
        height={500}
        className="w-full h-auto rounded-lg"
        onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
      />

      {/* Favorite/Watch Later Buttons */}
      <div className="absolute top-1 right-1 m-1 space-x-1 flex items-center">
        <button onClick={handleFavorite}>
          <img
            src={isFavorite ? "/images/icon.png" : "/images/star.png"}
            alt="Favorite Icon"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
        <button onClick={handleWatchLater}>
          <img
            src={isWatchLater ? "/images/fillclock.png" : "/images/clock.png"}
            alt="Watch Later Icon"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
      </div>

      {/* Hover Overlay with Movie Details */}
      <div className="absolute bottom-0 left-0 w-full bg-[#00003c] text-white p-2 rounded-b-lg 
    opacity-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-md">{title} ({released})</h3>
        <p className="text-xs">{synopsis}</p>

      {/* Genre Badge */}
        <div className="mt-2">
          <span className="bg-[#1ED2AF] text-white px-3 py-1 rounded-full text-sm">{genre}</span>
        </div>
      </div>
    </div>
  );
}
