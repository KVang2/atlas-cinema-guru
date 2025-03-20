"use client";
import React from "react";

interface WatchPaginationProps {
  currentPage: number;
  totalMovies: number;
  moviesPerPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

export default function WatchPagination({
  currentPage,
  totalMovies,
  moviesPerPage,
  nextPage,
  prevPage,
}: WatchPaginationProps) {
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const isLastPage = currentPage >= totalPages;
  const isFirstPage = currentPage === 1;

  return (
    <div className="flex items-center space-x-1 bg-[#00003c] p-2 rounded-full w-fit mt-4">
      {/* Previous Button */}
      <button
        onClick={prevPage}
        disabled={isFirstPage}
        className={`px-4 py-2 bg-[#1ED2AF] text-black font-medium rounded-l-full border-r border-black ${
          isFirstPage ? "opacity-50 cursor-not-allowed" : "hover:bg-[#19b79a]"
        }`}
      >
        Previous
      </button>
      {/* Next Buttons */}
      <button
        onClick={nextPage}
        disabled={isLastPage || totalPages === 0}
        className={`px-4 py-2 bg-[#1ED2AF] text-black font-medium rounded-r-full ${
          isLastPage || totalPages === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#19b79a]"
        }`}
      >
        Next
      </button>
    </div>
  );
}
