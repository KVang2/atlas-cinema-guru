"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Movie from "@/components/Movie";
import Pagination from "@/components/Pagination";

export default function WatchLaterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  interface Movie {
    id: string;
    title: string;
    image: string;
    released: number;
    synopsis: string;
    genre: string;
  }

  const [watchLaterMovies, setWatchLaterMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchWatchLaterMovies = async () => {
      try {
        const response = await fetch(`/api/watch-later?page=${currentPage}`);

        const textResponse = await response.text();
        console.log("Raw Watch Later API Response:", textResponse);

        if (!response.ok) {
          throw new Error(`Failed to fetch Watch Later movies: ${textResponse}`);
        }

        const data = JSON.parse(textResponse);
        console.log("Fetched Watch Later Movies:", data.watchLater);

        setWatchLaterMovies(data.watchLater || []);
      } catch (error) {
        console.error("Error fetching Watch Later movies:", error);
      }
    };

    if (session) fetchWatchLaterMovies();

    // Listen for updates from the Movie component
    const updateHandler = () => fetchWatchLaterMovies();
    window.addEventListener("watchLaterUpdated", updateHandler);

    return () => {
      window.removeEventListener("watchLaterUpdated", updateHandler);
    };
  }, [session, currentPage]);

  return (
    <Layout>
      <div>
        <h1 className="text-center text-4xl font-extrabold mt-4">Watch Later</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 pt-4 gap-8">
          {watchLaterMovies.length > 0 ? (
            watchLaterMovies.map((movie) => <Movie key={movie.id} {...movie} watchLater={true} />)
          ) : (
            <p className="text-gray-400 col-span-3 text-center">No movies in Watch Later.</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
            <Pagination
                currentPage={currentPage}
                totalMovies={watchLaterMovies.length}
                moviesPerPage={moviesPerPage}
                nextPage={() => setCurrentPage((prev) => prev + 1)}
                prevPage={() => setCurrentPage((prev) => prev - 1)}
            />
        </div>
      </div>
    </Layout>
  );
}
