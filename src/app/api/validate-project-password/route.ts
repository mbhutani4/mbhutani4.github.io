import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProject } from "helpers/getProjects";

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

    // Get the project to check its password
    let project;
    try {
      project = getProject(projectId);
    } catch (error) {
      return NextResponse.json(
        { valid: false, error: "Project not found" },
        { status: 404 },
      );
    }

    // Check if project has a password
    if (!project.password) {
      return NextResponse.json(
        { valid: false, error: "This project is not password protected" },
        { status: 400 },
      );
    }

    // Check site-level master password first
    const masterPassword = process.env.DRAFT_PASSWORD;
    const isMasterPassword = masterPassword && password === masterPassword;

    // Check project-specific password
    const isProjectPassword = password === project.password;

    // Allow access if either password is correct
    const isValid = isMasterPassword || isProjectPassword;

    if (!isValid) {
      return NextResponse.json(
        { valid: false, error: "Invalid password" },
        { status: 401 },
      );
    }

    // Password is correct - set a project-specific cookie
    const response = NextResponse.json(
      {
        valid: true,
        message: "Password verified",
        usedMasterPassword: isMasterPassword,
      },
      { status: 200 },
    );

    // Set a secure, httpOnly cookie specific to this project
    response.cookies.set(`project_auth_${projectId}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
