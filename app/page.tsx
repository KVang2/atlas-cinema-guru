"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-6 p-8 ml-4">

        {/* Search Bar */}
        <div className="flex flex-col space-y-4">
          <div>
            <span className="text-white">Search</span>
            <form onSubmit={handleSearch} className="mt-6 flex space-x-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 w-80 border border-[#1ED2AF] bg-[#00003c] rounded-full text-white"
              />
            </form>
          </div>
        
        {/* Min Year/ Max Year */}
        <div className="flex space-x-4">
            <div className="flex flex-col">
              <span className="text-white m-1">Min Year</span>
              <input
                type="text"
                title="Min Year"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                className="p-2 w-40 border border-[#1ED2AF] rounded-full text-white bg-[#00003c] text-center outline-none"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white m-1">Max Year</span>
              <input
                type="text"
                title="Max Year"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                className="p-2 w-40 border border-[#1ED2AF] rounded-full text-white bg-[#00003c] text-center outline-none"
              />
            </div>
          </div>
        </div>
        
        {/* Genre Options */}
        <div>
          <span className="text-white font-bold">Genres</span>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {["Romance", "Horror", "Drama", "Action", "Mystery", "Fantasy", "Thriller", "Western", "Sci-fi", "Adventure"].map((genre) => (
              <button 
                key={genre} 
                className="px-3 py-1 bg-[#00003c] text-white rounded-full hover:bg-[#1ED2AF] border-[#1ED2AF] border-1"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}