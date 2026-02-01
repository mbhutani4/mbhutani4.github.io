import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, projectId } = body;

    if (!password) {
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

    // Validate password
    const isValid = password === draftPassword;

    if (!isValid) {
      return NextResponse.json(
        { valid: false, error: "Invalid password" },
        { status: 401 },
      );
    }

    // Password is correct - set a secure cookie
    // The cookie will be used to remember authentication for subsequent requests
    const response = NextResponse.json(
      {
        valid: true,
        message: "Password verified",
        redirect: projectId ? `/project/${projectId}` : "/",
      },
      { status: 200 },
    );

    // Set a secure, httpOnly cookie that expires in 24 hours
    response.cookies.set("draft_authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
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

export async function DELETE(_request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: "Authentication cleared" },
      { status: 200 },
    );

    // Clear the authentication cookie
    response.cookies.delete("draft_authenticated");

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
