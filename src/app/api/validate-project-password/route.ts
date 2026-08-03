import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProject } from "helpers/getProjects";
import { getProjectPassword } from "config/projectSecrets";
import {
  AUTH_MAX_AGE,
  clientIp,
  isRateLimited,
  resetRateLimit,
  safeEqual,
} from "helpers/passwordAuth";

function rateScope(projectId: string): string {
  return `project:${projectId}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, projectId } = body;

    if (!password || !projectId) {
      return NextResponse.json(
        { valid: false, error: "Password and project ID are required" },
        { status: 400 },
      );
    }

    const ip = clientIp(request);
    if (isRateLimited(ip, rateScope(projectId))) {
      return NextResponse.json(
        { valid: false, error: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }

    // Ensure the project exists (returns 404 for unknown IDs)
    try {
      getProject(projectId);
    } catch (error) {
      return NextResponse.json(
        { valid: false, error: "Project not found" },
        { status: 404 },
      );
    }

    const projectPassword = getProjectPassword(projectId);

    // Check if project has a password
    if (!projectPassword) {
      return NextResponse.json(
        { valid: false, error: "This project is not password protected" },
        { status: 400 },
      );
    }

    // Check site-level master password first
    const masterPassword = process.env.DRAFT_PASSWORD;
    const isMasterPassword =
      masterPassword !== undefined && safeEqual(password, masterPassword);

    // Check project-specific password
    const isProjectPassword = safeEqual(password, projectPassword);

    // Allow access if either password is correct
    const isValid = isMasterPassword || isProjectPassword;

    if (!isValid) {
      return NextResponse.json(
        { valid: false, error: "Invalid password" },
        { status: 401 },
      );
    }

    resetRateLimit(ip, rateScope(projectId));

    // Password is correct - set a project-specific cookie
    const response = NextResponse.json(
      {
        valid: true,
        message: "Password verified",
        usedMasterPassword: isMasterPassword,
      },
      { status: 200 },
    );

    response.cookies.set(`project_auth_${projectId}`, "true", {
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 },
      );
    }

    const response = NextResponse.json(
      { success: true, message: "Authentication cleared" },
      { status: 200 },
    );

    // Clear the project-specific authentication cookie
    response.cookies.delete(`project_auth_${projectId}`);

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
