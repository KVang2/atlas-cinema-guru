"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";

export default function favorites() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [favorites, setFavorites] = useState([]);

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
                <img src="/images/photo1.jpg" alt="Photo 1" className="w-full h-auto rounded-lg shadow-md" />
                <img src="/images/photo2.jpg" alt="Photo 2" className="w-full h-auto rounded-lg shadow-md" />
                <img src="/images/photo3.jpg" alt="Photo 3" className="w-full h-auto rounded-lg shadow-md" />
                <img src="/images/photo4.jpg" alt="Photo 4" className="w-full h-auto rounded-lg shadow-md" />
                <img src="/images/photo5.jpg" alt="Photo 5" className="w-full h-auto rounded-lg shadow-md" />
                <img src="/images/photo6.jpg" alt="Photo 6" className="w-full h-auto rounded-lg shadow-md" />
            </div>
        </div>
    </Layout>
    );
}