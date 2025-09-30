import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database";
import { cache, CacheKeys } from "@/lib/cache";

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// GET - Lấy single product với variants (WITH CACHE)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Generate cache key based on ID or slug
    const cacheKey = params.id.includes('-')
      ? CacheKeys.productBySlug(params.id)
      : CacheKeys.productById(params.id);

    // Use cache with 10 minute TTL for single products
    const product = await cache.get(
      cacheKey,
      async () => {
        const result = await prisma.product.findFirst({
          where: {
            OR: [{ id: params.id }, { slug: params.id }],
          },
          include: {
            variants: {
              where: { inStock: true },
              orderBy: [{ storage: "asc" }, { color: "asc" }],
            },
            colors: true,
            regionPrices: true,
          },
        });

        if (!result) {
          throw new Error("Product not found");
        }

        return serializeBigInt(result);
      },
      10 * 60 * 1000 // 10 minutes
    );

    return NextResponse.json(product, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    console.error("Get single product error:", error);

    if (error instanceof Error && error.message === "Product not found") {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Không thể lấy thông tin sản phẩm" },
      { status: 500 }
    );
  }
}
