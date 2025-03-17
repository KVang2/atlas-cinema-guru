"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (status === "unauthenticated") {
      router.replace("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  const logout = useCallback(() => {
    signOut();
  }, []);

  return { user: session?.user, logout };
}
