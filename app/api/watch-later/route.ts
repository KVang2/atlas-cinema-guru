import { fetchWatchLaters, insertWatchLater, deleteWatchLater } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * GET /api/watch-later - Get user's Watch Later movies
 */
export const GET = auth(async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;

  //@ts-ignore
  if (!req.auth) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const {
    user: { email }, //@ts-ignore
  } = req.auth;

  try {
    const watchLaterMovies = await fetchWatchLaters(page, email); // Ensure page & email are used
    return NextResponse.json({ watchLater: watchLaterMovies });
  } catch (error) {
    console.error("Error fetching Watch Later movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch Watch Later movies" },
      { status: 500 }
    );
  }
});

/**
 * POST /api/watch-later - Add a movie to Watch Later
 */
export const POST = auth(async (req: NextRequest) => {
  //@ts-ignore
  if (!req.auth) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const {
    user: { email }, //@ts-ignore
  } = req.auth;

  try {
    const { movieId } = await req.json();
    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    console.log(`Adding movie ${movieId} to Watch Later for ${email}`);
    await insertWatchLater(movieId, email);

    return NextResponse.json({ message: "Movie added to Watch Later" }, { status: 200 });
  } catch (error) {
    console.error("Error adding movie to Watch Later:", error);
    return NextResponse.json(
      { error: "Failed to add movie to Watch Later" },
      { status: 500 }
    );
  }
});

/**
 * DELETE /api/watch-later - Remove a movie from Watch Later
 */
export const DELETE = auth(async (req: NextRequest) => {
  //@ts-ignore
  if (!req.auth) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const {
    user: { email }, //@ts-ignore
  } = req.auth;

  try {
    const { movieId } = await req.json();
    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    console.log(`Removing movie ${movieId} from Watch Later for ${email}`);
    await deleteWatchLater(movieId, email);

    return NextResponse.json({ message: "Movie removed from Watch Later" }, { status: 200 });
  } catch (error) {
    console.error("Error removing movie from Watch Later:", error);
    return NextResponse.json(
      { error: "Failed to remove movie from Watch Later" },
      { status: 500 }
    );
  }
});
