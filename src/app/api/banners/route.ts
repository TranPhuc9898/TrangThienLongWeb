import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/database";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { order: "asc" },
    });
    console.log("📄 API GET /banners - Found banners:", banners.length);
    return NextResponse.json(banners);
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
    const banner = await prisma.banner.create({
      data: {
        ...bannerData,
        order: bannerData.order || 1,
      },
    });
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
    const { id } = await request.json();
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
