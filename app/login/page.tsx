"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-4">Login to Cinema Guru</h1>
      <button 
        onClick={() => signIn("github")} 
        className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
