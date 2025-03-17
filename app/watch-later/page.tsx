"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";

export default function watchlater() {

    return (
    <Layout>
        <div>
            <div className="text-center text-4xl font-extrabold mt-4">
                <h1>Watch Later</h1>
            </div>

            {/* Watch Later Movies */}
            <div className="grid grid-cols-3 gap-4 p-6">
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