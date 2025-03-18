"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Movie from "@/components/Movie";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  interface Movie {
    id: string;
    title: string;
    released: number;
    synopsis: string;
    genre: string;
    favorited: boolean;
    watchLater: boolean;
    image: string;
  }

  const [results, setResults] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch movie data
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/titles");
        const data = await response.json();
        if (data.title) {
          setResults(data.title);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on search, years, and genres
  const filteredMovies = results.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear =
      (!minYear || movie.released >= parseInt(minYear)) &&
      (!maxYear || movie.released <= parseInt(maxYear));
    const matchesGenres =
      selectedGenres.length === 0 || selectedGenres.includes(movie.genre);

    return matchesSearch && matchesYear && matchesGenres;
  });

  // Get current movies based on pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Pagination Functions
  const nextPage = () => {
    if (indexOfLastMovie < filteredMovies.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Layout>
      {/* Filters Section */}
      <div className="flex justify-between items-start p-8">
        {/* Search */}
        <div>
          <div className="flex flex-col space-y-4 mb-4">
            <span className="text-white">Search</span>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-80 border border-[#1ED2AF] bg-[#00003c] rounded-full text-white text-center"
            />
          </div>

          {/* Min Year/ Max Year */}
          <div className="flex space-x-4 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-white">Min Year</span>
              <input
                type="text"
                placeholder="1990"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                maxLength={4}
                className="p-2 w-40 border border-[#1ED2AF] rounded-full text-white bg-[#00003c] text-center"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white">Max Year</span>
              <input
                type="text"
                placeholder="2024"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                maxLength={4}
                className="p-2 w-40 border border-[#1ED2AF] rounded-full text-white bg-[#00003c] text-center"
              />
            </div>
          </div>
        </div>

        {/* Genre Options */}
        <div className="flex flex-col mb-6">

          <div className="mb-2">
            <span className="text-white font-bold">Genres</span>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {["Romance", "Horror", "Drama", "Action", "Mystery", "Fantasy", "Thriller", "Western", "Sci-Fi", "Adventure"].map(
              (genre) => (
                <button
                  key={genre}
                  onClick={() =>
                    setSelectedGenres((prev) =>
                      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
                    )
                  }
                  className={`px-3 py-1 rounded-full border border-[#1ED2AF] text-white ${
                    selectedGenres.includes(genre) ? "bg-[#1ED2AF] text-[#00003c]" : "bg-[#00003c]"
                  }`}
                >
                  {genre}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Movie List - Centered */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentMovies.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalMovies={filteredMovies.length}
          moviesPerPage={moviesPerPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </Layout>
  );
}
