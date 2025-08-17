import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username và password là bắt buộc" },
        { status: 400 }
      );
    }

    if (!verifyAdmin(username, password)) {
      return NextResponse.json(
        { error: "Thông tin đăng nhập không chính xác" },
        { status: 401 }
      );
    }

    const token = createToken();

    const response = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
    });

    // Set HTTP-only cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    });

    // Clear the auth cookie
    response.cookies.delete("admin-token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

