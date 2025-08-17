import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function verifyAdmin(username: string, password: string): boolean {
  return (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  );
}

export function createToken(): string {
  return jwt.sign(
    {
      role: "admin",
      timestamp: Date.now(),
      username: process.env.ADMIN_USERNAME,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );
}

export function verifyToken(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    return decoded.role === "admin";
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export function clearAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete("admin-token");
}

