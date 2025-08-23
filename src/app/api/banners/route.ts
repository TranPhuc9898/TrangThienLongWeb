import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { access } from "fs/promises";
import { join } from "path";

// Helper function to check if file exists
async function checkImageExists(imageUrl: string): Promise<boolean> {
  try {
    if (!imageUrl.startsWith("/uploads/")) return true; // External URLs are assumed valid

    const filePath = join(process.cwd(), "public", imageUrl);
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { order: "asc" },
    });

    // 🔥 FIX: Filter out banners with missing images
    const validBanners = [];
    for (const banner of banners) {
      const imageExists = await checkImageExists(banner.imageUrl);
      if (imageExists) {
        validBanners.push(banner);
      } else {
        console.warn(
          `⚠️ Banner ${banner.id} has missing image: ${banner.imageUrl}`
        );
        // Optionally auto-delete invalid banners
        // await prisma.banner.delete({ where: { id: banner.id } });
      }
    }

    console.log(
      "📄 API GET /banners - Found valid banners:",
      validBanners.length
    );
    return NextResponse.json(validBanners);
  } catch (error) {
    console.error("❌ Banner fetch error:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyToken()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bannerData = await request.json();

    // 🔥 FIX: Validate image exists before creating banner
    const imageExists = await checkImageExists(bannerData.imageUrl);
    if (!imageExists) {
      console.error(
        `❌ Cannot create banner - image not found: ${bannerData.imageUrl}`
      );
      return NextResponse.json(
        { error: "File ảnh không tồn tại. Vui lòng upload lại!" },
        { status: 400 }
      );
    }

    const banner = await prisma.banner.create({
      data: {
        ...bannerData,
        order: bannerData.order || 1,
      },
    });

    console.log("✅ Banner created successfully with valid image:", banner.id);
    return NextResponse.json(banner);
  } catch (error) {
    console.error("Banner create error:", error);
    return NextResponse.json(
      { error: "Không thể tạo banner" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!verifyToken()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const requestData = await request.json();
    console.log("🔄 API PUT /banners - Received data:", requestData);

    const { id, ...updateData } = requestData;
    console.log("📝 Updating banner ID:", id, "with data:", updateData);

    const banner = await prisma.banner.update({
      where: { id },
      data: updateData,
    });

    console.log("✅ Banner updated successfully:", banner);
    return NextResponse.json(banner);
  } catch (error) {
    console.error("❌ Banner update error:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật banner" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyToken()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, cleanup } = await request.json();

    // 🔥 FIX: Special cleanup mode to delete banners with missing images
    if (cleanup === true) {
      console.log(
        "🧹 Starting banner cleanup - removing banners with missing images..."
      );

      const allBanners = await prisma.banner.findMany();
      let deletedCount = 0;

      for (const banner of allBanners) {
        const imageExists = await checkImageExists(banner.imageUrl);
        if (!imageExists) {
          console.log(
            `🗑️ Deleting banner with missing image: ${banner.id} - ${banner.imageUrl}`
          );
          await prisma.banner.delete({ where: { id: banner.id } });
          deletedCount++;
        }
      }

      console.log(
        `✅ Cleanup completed - deleted ${deletedCount} invalid banners`
      );
      return NextResponse.json({
        success: true,
        message: `Đã xóa ${deletedCount} banner có ảnh bị mất`,
        deletedCount,
      });
    }

    // Normal single banner delete
    if (!id) {
      return NextResponse.json({ error: "Missing banner ID" }, { status: 400 });
    }

    await prisma.banner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Banner delete error:", error);
    return NextResponse.json(
      { error: "Không thể xóa banner" },
      { status: 500 }
    );
  }
}
