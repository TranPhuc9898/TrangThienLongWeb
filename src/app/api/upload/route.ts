import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, access } from "fs/promises";
import { join } from "path";
import { verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  console.log("🚀 Upload API called - Production");

  try {
    // 🔐 Auth check với config chính xác
    const isAuthenticated = verifyToken();
    console.log("🔑 Auth result:", isAuthenticated);

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Không có quyền truy cập - Cần đăng nhập admin" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    let file = formData.get("file") as File | null;

    if (!file) {
      const files = formData.getAll("file");
      if (files && files.length > 0) file = files[0] as File;
    }
    if (!file) {
      const filesAlt = formData.getAll("files");
      if (filesAlt && filesAlt.length > 0) file = filesAlt[0] as File;
    }

    if (!file) {
      return NextResponse.json(
        { error: "Không có file được tải lên" },
        { status: 400 }
      );
    }

    console.log("📁 File:", file.name, file.size, file.type);

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Chỉ chấp nhận file ảnh (JPEG, PNG, WebP)" },
        { status: 400 }
      );
    }

    // 📏 Validate với MAX_FILE_SIZE từ .env (7340032 = 7MB)
    const maxSize = parseInt(process.env.MAX_FILE_SIZE || "7340032");
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File quá lớn (tối đa ${Math.round(
            maxSize / (1024 * 1024)
          )}MB)`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 📝 Create unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
    const filename = `${timestamp}-${originalName}`;

    // 📂 UPLOAD_DIR từ .env = "./public/uploads"
    const uploadDir = join(process.cwd(), "public", "uploads");
    console.log("📂 Upload dir:", uploadDir);

    // Ensure directory exists với correct permissions
    try {
      await access(uploadDir);
      console.log("✅ Directory exists");
    } catch {
      console.log("📁 Creating directory...");
      await mkdir(uploadDir, { recursive: true, mode: 0o755 });
      console.log("✅ Directory created");
    }

    const filepath = join(uploadDir, filename);
    console.log("💾 Writing to:", filepath);

    // Write file với permissions
    await writeFile(filepath, buffer, { mode: 0o644 });

    console.log("🎉 Upload thành công:", filename);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    console.error("💥 Upload error:", error);
    return NextResponse.json(
      { error: "Không thể tải lên file", details: error.message },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "Upload API running",
    env: process.env.NODE_ENV,
    maxSize: process.env.MAX_FILE_SIZE,
    uploadDir: process.env.UPLOAD_DIR,
  });
}
