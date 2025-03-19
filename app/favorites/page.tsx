"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Movie from "@/components/Movie";
import Pagination from "@/components/Pagination";

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
  const moviesPerPage = 6; // Number of movies per page

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        if (!response.ok) throw new Error("Failed to fetch favorites");
  
        const data = await response.json();
        console.log("Fetched Favorites:", data.favorites); // Debugging log
  
        setFavorites(data.favorites || []); // Ensure it sets an array
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
  
    if (session) fetchFavorites();
  }, [session]);

  // Pagination Logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

  // Pagination Functions
  const nextPage = () => {
    if (indexOfLastMovie < favorites.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Layout>
      <div>
        <div className="text-center text-4xl font-extrabold mt-4">
          <h1>Favorites</h1>
        </div>

        {/* Favorite Movies */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 pt-4 gap-8">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
              <Movie key={movie.id} {...movie} favorited={true} />
            ))
          ) : (
            <p className="text-gray-400 col-span-3 text-center">No favorites found.</p>
          )}
        </div>

        {/* Pagination Component */}
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalMovies={favorites.length}
            moviesPerPage={moviesPerPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      </div>
    </Layout>
  );
}
