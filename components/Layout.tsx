"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      
      {/* Sidebar - Collapsible */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1ED2AF] p-5 pt-8 shadow-lg transition-all duration-300 border-r-2 border-[#00003c]
          ${isSidebarOpen ? "w-65" : "w-25"} hidden md:block`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="flex flex-col mt-15 ml-2 space-y-6">
          {/* Home */}
          <Link href="/" className="flex items-center space-x-4 cursor-pointer">
            <img src="/images/folder.png" alt="Folder Icon" className="w-10 h-10" />
            <span className={`text-white text-lg transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Home
            </span>
          </Link>

          {/* Favorite */}
          <Link href="/favorites" className="flex items-center space-x-4 cursor-pointer">
            <img src="/images/Icon.png" alt="Fav Icon" className="w-10 h-10" />
            <span className={`text-white text-lg transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Favorite
            </span>
          </Link>

          {/* Watch Later */}
          <Link href="/watch-later" className="flex items-center space-x-4 cursor-pointer">
            <img src="/images/fillclock.png" alt="Watch Later Icon" className="w-10 h-10" />
            <span className={`text-white text-lg transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Watch Later
            </span>
          </Link>

          {/* Latest Activities */}
          <div
            className={`mt-4 p-4 bg-[#1dfedc] rounded-lg shadow-lg text-lg transition-opacity duration-300 whitespace-nowrap ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-[#00003c] font-extrabold text-lg text-center mb-2">
              Latest Activities
            </h2>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#1ED2AF] text-[#00003c] flex items-center justify-between p-4">
        {/* Logo/Title */}
        <div className="flex items-center">
          <img src="/images/film.png" alt="film Icon" className="flex w-10 h-10" />
          <h1 className="ml-2 text-lg font-semibold">Cinema Guru</h1>
        </div>

        {/* User Name/Logout */}
        <div className="flex items-center space-x-6">
          <span className="text-[#00003c] text-sm">Welcome, {user?.email}</span>
          <button className="text-[#00003c] text-sm hover:underline" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Moves when Sidebar Expands */}
      <main className={`flex-grow transition-all duration-300 mt-16 p-6 bg-[#00003c] text-white w-full
        ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {children}
      </main>
    </div>
  );
}
