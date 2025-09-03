import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database";

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// GET - Lấy single product với variants
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
      include: {
        variants: {
          where: { inStock: true }, // Only get in-stock variants
          orderBy: [{ storage: "asc" }, { color: "asc" }],
        },
        colors: true,
        regionPrices: true, // Include region prices
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeBigInt(product));
  } catch (error) {
    console.error("Get single product error:", error);
    return NextResponse.json(
      { error: "Không thể lấy thông tin sản phẩm" },
      { status: 500 }
    );
  }
}
