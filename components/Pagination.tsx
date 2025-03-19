"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalMovies: number;
  moviesPerPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

export default function Pagination({
  currentPage,
  totalMovies,
  moviesPerPage,
  nextPage,
  prevPage,
}: PaginationProps) {

  return (
    <div className="flex items-center space-x-0.5 bg-[#00003c] p-2 rounded-full w-fit mt-4">
      {/* Previous Button */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1} // Disable if on first page
        className={`px-4 py-2 bg-[#1ED2AF] text-black font-medium rounded-l-full border-r border-black ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#19b79a]"
        }`}
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        onClick={nextPage}
        disabled={currentPage * moviesPerPage >= totalMovies} // Disable if at last page
        className={`px-4 py-2 bg-[#1ED2AF] text-black font-medium rounded-r-full ${
          currentPage * moviesPerPage >= totalMovies ? "opacity-50 cursor-not-allowed" : "hover:bg-[#19b79a]"
        }`}
      >
        Next
      </button>
    </div>
  );
}
