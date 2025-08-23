import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const isValid = verifyToken();

    if (isValid) {
      return NextResponse.json({
        authenticated: true,
        message: "Admin authenticated",
      });
    } else {
      return NextResponse.json(
        {
          authenticated: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth status check error:", error);
    return NextResponse.json(
      {
        authenticated: false,
        message: "Authentication check failed",
      },
      { status: 500 }
    );
  }
}
