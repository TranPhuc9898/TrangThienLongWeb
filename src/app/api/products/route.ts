import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/database";

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

// Generate unique slug
async function generateSlug(
  productName: string,
  excludeId?: string
): Promise<string> {
  const baseSlug = productName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove multiple hyphens
    .trim();

  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } }),
      },
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// GET - Lấy tất cả sản phẩm với variants
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          orderBy: [{ storage: "asc" }, { color: "asc" }],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(serializeBigInt(products));
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

// POST - Tạo sản phẩm mới với variants
export async function POST(request: NextRequest) {
  try {
    if (!verifyToken()) {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 401 }
      );
    }

    const {
      // Basic info
      productName,
      brand,
      condition = "99%",

      // Pricing
      basePrice,
      currency = "VND",
      discount,

      // Media & description
      thumbnail,
      description,

      // Promotions
      promotionGeneral,
      promotionStudent,
      installment,

      // Metadata
      category,
      rating = 4.9,
      reviewCount = 0,
      featured = false,
      inStock = true,

      // Variants
      variants = [],
    } = await request.json();

    // Validate required fields
    if (!productName || !basePrice || !brand || !thumbnail) {
      return NextResponse.json(
        {
          error:
            "Thiếu thông tin bắt buộc: productName, basePrice, brand, thumbnail",
        },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = await generateSlug(productName);

    // Validate and convert prices to BigInt
    let basePriceValue: bigint;
    try {
      basePriceValue = BigInt(basePrice);
    } catch (error) {
      return NextResponse.json(
        { error: "basePrice không hợp lệ" },
        { status: 400 }
      );
    }

    // Validate variants
    const processedVariants = [];
    for (const variant of variants) {
      if (
        !variant.storage ||
        !variant.color ||
        !variant.price ||
        !variant.image
      ) {
        return NextResponse.json(
          { error: "Variant thiếu thông tin: storage, color, price, image" },
          { status: 400 }
        );
      }

      try {
        processedVariants.push({
          ...variant,
          price: BigInt(variant.price),
          quantity: variant.quantity || 0,
          inStock: variant.inStock !== false,
        });
      } catch (error) {
        return NextResponse.json(
          {
            error: `Giá variant không hợp lệ: ${variant.storage} ${variant.color}`,
          },
          { status: 400 }
        );
      }
    }

    // Create product with variants
    const product = await prisma.product.create({
      data: {
        productName,
        brand,
        condition,
        slug,
        basePrice: basePriceValue,
        currency,
        discount,
        thumbnail,
        description,
        promotionGeneral,
        promotionStudent,
        installment,
        category,
        rating,
        reviewCount,
        featured,
        inStock,
        variants: {
          create: processedVariants,
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(serializeBigInt(product));
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Không thể tạo sản phẩm" },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật sản phẩm và variants
export async function PUT(request: NextRequest) {
  try {
    if (!verifyToken()) {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 401 }
      );
    }

    const { id, variants = [], ...productData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID sản phẩm" }, { status: 400 });
    }

    // Update slug if productName changed
    if (productData.productName) {
      productData.slug = await generateSlug(productData.productName, id);
    }

    // Convert basePrice to BigInt if present
    if (productData.basePrice !== undefined) {
      try {
        productData.basePrice = BigInt(productData.basePrice);
      } catch (error) {
        return NextResponse.json(
          { error: "basePrice không hợp lệ" },
          { status: 400 }
        );
      }
    }

    // Process variants
    const processedVariants = [];
    for (const variant of variants) {
      if (
        !variant.storage ||
        !variant.color ||
        !variant.price ||
        !variant.image
      ) {
        return NextResponse.json(
          { error: "Variant thiếu thông tin: storage, color, price, image" },
          { status: 400 }
        );
      }

      try {
        processedVariants.push({
          ...variant,
          price: BigInt(variant.price),
          quantity: variant.quantity || 0,
          inStock: variant.inStock !== false,
        });
      } catch (error) {
        return NextResponse.json(
          {
            error: `Giá variant không hợp lệ: ${variant.storage} ${variant.color}`,
          },
          { status: 400 }
        );
      }
    }

    // Update product and replace all variants
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        variants: {
          deleteMany: {}, // Delete all existing variants
          create: processedVariants, // Create new variants
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json(serializeBigInt(product));
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Không thể cập nhật sản phẩm" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa sản phẩm (cascade variants)
export async function DELETE(request: NextRequest) {
  try {
    if (!verifyToken()) {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID sản phẩm" }, { status: 400 });
    }

    // Delete product (variants will be cascade deleted)
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Không thể xóa sản phẩm" },
      { status: 500 }
    );
  }
}
