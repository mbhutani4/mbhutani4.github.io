import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_MAX_AGE,
  clientIp,
  isRateLimited,
  resetRateLimit,
  safeEqual,
} from "helpers/passwordAuth";

const RATE_SCOPE = "draft";

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  if (isRateLimited(ip, RATE_SCOPE)) {
    return NextResponse.json(
      { valid: false, error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { valid: false, error: "Password is required" },
        { status: 400 },
      );
    }

    const draftPassword = process.env.DRAFT_PASSWORD;

    // If no password configured, deny
    if (!draftPassword) {
      return NextResponse.json(
        { valid: false, error: "Draft access not available" },
        { status: 403 },
      );
    }

    // Validate password with a constant-time comparison
    if (!safeEqual(password, draftPassword)) {
      return NextResponse.json(
        { valid: false, error: "Invalid password" },
        { status: 401 },
      );
    }

    resetRateLimit(ip, RATE_SCOPE);

    // Password is correct - set a secure cookie
    const response = NextResponse.json(
      { valid: true, message: "Password verified" },
      { status: 200 },
    );

    response.cookies.set("draft_authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AUTH_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: "Authentication cleared" },
    { status: 200 },
  );

  // Clear the authentication cookie
  response.cookies.delete("draft_authenticated");

  return response;
}
