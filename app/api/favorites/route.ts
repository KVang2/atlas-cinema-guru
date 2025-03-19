import { fetchFavorites, insertFavorite, deleteFavorite } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * GET /api/favorites - Get user's favorite movies
 */
export const GET = auth(async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const pageParam = params.get("page");
  const page = pageParam ? Number(pageParam) : 1;

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  //@ts-ignore
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized - Not logged in" }, { status: 401 });
  }

  const {
    user: { email }, //@ts-ignore
  } = req.auth;

  try {
    const { favorites, totalMovies } = await fetchFavorites(page, email);
    return NextResponse.json({ favorites, totalMovies });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
});


/**
 * POST /api/favorites - Add a movie to favorites
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

    // Attempt to add the favorite
    await insertFavorite(movieId, email);
    return NextResponse.json({ message: "Movie added to favorites" }, { status: 200 });
  } catch (error) {
    if (error === "Movie is already in favorites.") {
      return NextResponse.json({ error: "Movie already exists in favorites" }, { status: 409 });
    }

    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
});


/**
 * DELETE /api/favorites - Remove a movie from favorites
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

    await deleteFavorite(movieId, email);
    return NextResponse.json({ message: "Movie removed from favorites" }, { status: 200 });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
});
