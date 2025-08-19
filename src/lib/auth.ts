import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

/**
 * Verify admin credentials
 */
export function verifyAdmin(username: string, password: string): boolean {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

/**
 * Create signed JWT token for admin
 */
export function createToken(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      role: "admin",
      username: process.env.ADMIN_USERNAME,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
}

/**
 * Verify token from cookies
 */
export function verifyToken(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) {
      console.warn("⚠️ No token found in cookies");
      return false;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (decoded?.role === "admin") {
      console.log("✅ Token valid for admin:", decoded.username);
      return true;
    }

    console.warn("⚠️ Invalid role in token:", decoded?.role);
    return false;
  } catch (error: any) {
    console.error("❌ Token verification failed:", error.message);
    return false;
  }
}
