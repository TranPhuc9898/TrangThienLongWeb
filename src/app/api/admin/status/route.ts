import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  if (verifyToken()) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

