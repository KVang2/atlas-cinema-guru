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
    <div className="flex items-center space-x-0.5 bg-[#00003c] p-2 rounded-full w-fit">
  <button className="px-4 py-2 bg-[#1ED2AF] text-black font-medium rounded-l-full border-r border-black">
    Previous
  </button>
  <button className="px-4 py-2 bg-[#1ED2AF] text-black font-medium rounded-r-full">
    Next
  </button>
</div>

  );
}
