"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function favorites() {
    const { data: session, status } = useSession();
    const router = useRouter();

    interface Movie {
        id: string;
        title: string;
        image: string;
    }

    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }
    , [status, router]);

    useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const response = await fetch("/api/favorites");
            const data = await response.json();
            setFavorites(data);
          } catch (error) {
            console.error("Error fetching favorites:", error);
          }
        };
    
        if (session) fetchFavorites();
      }, [session]);
    
    if (!session) return null;

    return (
    <Layout>
        <div>
            <div className="text-center text-4xl font-extrabold mt-4">
                <h1>Favorites</h1>
            </div>

            {/* Favorite Movies */}
            <div className="grid grid-cols-3 pt-4 gap-8">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <div key={movie.id} className="text-center">
                            <img 
                                src={movie.image} 
                                alt={movie.title} 
                                className="w-full h-auto rounded-lg shadow-md" 
                            />
                            <p className="text-white mt-2">{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 col-span-3 text-center">No favorites found.</p>
                )}
            </div>
        </div>
    </Layout>
    );
}