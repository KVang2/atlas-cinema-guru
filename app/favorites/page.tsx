"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Movie from "@/components/Movie";
import FavoritesPagination from "@/components/FavoritesPagination";

export default function Favorites() {
  const { data: session, status } = useSession();
  const router = useRouter();

  interface Movie {
    id: string;
    title: string;
    image: string;
    released: number;
    synopsis: string;
    genre: string;
    favorited: boolean;
  }

  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const moviesPerPage = 6; // Number of movies per page

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites?page=${currentPage}`);
        if (!response.ok) throw new Error("Failed to fetch favorites");

        const data = await response.json();
        setFavorites(data.favorites || []);
        setTotalMovies(data.totalMovies || 0); // Store total number of favorites
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (session) fetchFavorites();
  }, [session, currentPage]);

  return (
    <Layout>
      <div>
        <div className="text-center text-4xl font-extrabold mt-4">
          <h1>Favorites</h1>
        </div>

        {/* Favorite Movies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-4 gap-8">
          {favorites.length > 0 ? (
            favorites.map((movie) => <Movie key={movie.id} {...movie} favorited={true} />)
          ) : (
            <div className="text-gray-400 col-span-3 text-center animate-pulse">
              Loading...
            </div>
          )}
        </div>

        {/* Pagination Component */}
        <div className="flex justify-center mt-4">
          <FavoritesPagination
            currentPage={currentPage}
            totalMovies={totalMovies}
            moviesPerPage={moviesPerPage}
            nextPage={() => setCurrentPage((prev) => prev + 1)}
            prevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
        </div>
      </div>
    </Layout>
  );
}
