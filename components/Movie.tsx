import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import session for authentication

interface MovieProps {
  id: string;
  title: string;
  released: number;
  synopsis: string;
  genre: string;
  image: string;
  favorited?: boolean; // Prop received from Favorites page
}

export default function Movie({ id, title, released, synopsis, genre, image, favorited = false }: MovieProps) {
  const { data: session } = useSession(); // Get user session
  const [isFavorite, setIsFavorite] = useState<boolean>(favorited);

  console.log("Movie Image URL:", image);

  // Fetch favorite status when the component mounts
  useEffect(() => {
    async function checkFavoriteStatus() {
      try {
        const response = await fetch(`/api/favorites`);
        if (!response.ok) throw new Error("Failed to fetch favorites");

        const data = await response.json();
        const isFav = data.favorites.some((movie: { id: string }) => movie.id === id);

        // Only update state if different from current value
        if (isFav !== isFavorite) {
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("Failed to check favorite status:", error);
      }
    }

    checkFavoriteStatus();
  }, [id]); // Runs only when the `id` changes

  // Handle favorite toggle
  const handleFavorite = async () => {
    if (!session) {
      console.error("User is not logged in. Redirecting to login.");
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST"; // Toggle favorite state
      const response = await fetch(`/api/favorites`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`, // Ensure user is authenticated
        },
        body: JSON.stringify({ movieId: id }), // Ensure correct format
      });

      // 🚀 Debugging logs
      console.log("Favorite API Response:", response);

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error response from API:", errorMessage);
        throw new Error(`Failed to update favorite: ${errorMessage}`);
      }

      setIsFavorite((prev) => !prev); // Toggle favorite state
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error toggling favorite movie:", error.message);
      } else {
        console.error("Error toggling favorite movie:", error);
      }
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
        onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")} // Fallback image
      />

      {/* Favorite/WatchLater Button */}
      <div className="absolute top-1 right-1 m-1 space-x-1 flex items-center">
        <button onClick={handleFavorite}>
          <img
            src={isFavorite ? "/images/icon.png" : "/images/star.png"}
            alt="Favorite Icon"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
        <button>
          <img src="/images/clock.png" alt="Watch Later Icon" className="w-6 h-6" />
        </button>
      </div>

      {/* Hover Overlay with Movie Details */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-y-4 duration-300 p-4">
        <div className="flex items-start">
          <h3 className="text-white text-md">{title}</h3>
          <p className="text-white text-sm">{released}</p>
        </div>
        <div>
          <p className="text-white text-sm">{synopsis}</p>
          <p className="text-white text-sm">{genre}</p>
        </div>
      </div>
    </div>
  );
}
