import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/database";
import fs from "fs";
import path from "path";

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

function onlyDigits(input: any): string {
  if (typeof input === "number") return String(Math.trunc(input));
  if (!input) return "0";
  return String(input).replace(/\D/g, "");
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
        colors: true,
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
      // Colors galleries per color
      colors = [],
      // Tag for filtering
      tag,
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

    // Convert basePrice to BigInt (allow formatted input)
    let basePriceValue: bigint = BigInt(onlyDigits(basePrice));

    // Validate colors (gallery per color)
    const processedColors = [] as { color: string; images: any }[];
    for (const c of colors || []) {
      if (!c.color) {
        return NextResponse.json(
          { error: "Thiếu tên màu trong colors[]" },
          { status: 400 }
        );
      }
      const imgs = Array.isArray(c.images)
        ? (c.images as string[]).slice(0, 5)
        : [];
      processedColors.push({ color: c.color, images: imgs as any });
    }

    // Validate variants
    const processedVariants = [];
    for (const variant of variants) {
      if (!variant.storage || !variant.color) {
        continue;
      }

      const colorGallery = processedColors.find(
        (c) => c.color === variant.color
      );
      processedVariants.push({
        ...variant,
        price: BigInt(onlyDigits(variant.price)),
        quantity: variant.quantity || 0,
        inStock: variant.inStock !== false,
        image:
          variant.image ||
          (colorGallery && (colorGallery.images as any[])[0]) ||
          thumbnail,
      });
    }

    // Create product with variants
    const product = await prisma.product.create({
      data: {
        productName,
        brand,
        condition,
        slug,
        tag: tag || productName, // Default to productName if no tag provided
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
        variants: { create: processedVariants },
        colors: { create: processedColors },
      },
      include: {
        variants: true,
        colors: true,
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
  // Declare variables outside try block for error logging
  let id: string | undefined;
  let variants: any[] = [];
  let colors: any[] = [];

  try {
    if (!verifyToken()) {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 401 }
      );
    }

    const requestData = await request.json();
    id = requestData.id;
    variants = requestData.variants || [];
    colors = requestData.colors || [];
    const productData = { ...requestData };
    delete productData.id;
    delete productData.variants;
    delete productData.colors;

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

    // Prepare colors first (needed for variant image lookup)
    const processedColors = (colors || []).map((c: any) => ({
      color: c.color,
      images: Array.isArray(c.images) ? (c.images as string[]).slice(0, 5) : [],
    }));

    // Process variants
    const processedVariants = [];
    for (const variant of variants) {
      if (!variant.storage || !variant.color || !variant.price) {
        return NextResponse.json(
          { error: "Variant thiếu thông tin: storage, color, price" },
          { status: 400 }
        );
      }

      try {
        // Find color gallery for this variant
        const colorGallery = processedColors.find(
          (c: any) => c.color === variant.color
        );

        processedVariants.push({
          ...variant,
          price: BigInt(variant.price),
          quantity: variant.quantity || 0,
          inStock: variant.inStock !== false,
          image:
            variant.image ||
            (colorGallery && (colorGallery.images as any[])[0]) ||
            productData.thumbnail,
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

    // Update product and replace all variants and colors
    const product = await prisma.product.update({
      where: { id: id as any },
      data: {
        ...productData,
        variants: {
          deleteMany: {}, // Delete all existing variants
          create: processedVariants, // Create new variants
        },
        colors: {
          deleteMany: {},
          create: processedColors,
        },
      },
      include: {
        variants: true,
        colors: true,
      },
    });

    return NextResponse.json(serializeBigInt(product));
  } catch (error) {
    console.error("Update product error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      productId: id,
      variantsCount: variants?.length || 0,
      colorsCount: colors?.length || 0,
    });
    return NextResponse.json(
      {
        error: "Không thể cập nhật sản phẩm",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Helper function to safely delete file
function safeDeleteFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Failed to delete file: ${filePath}`, error);
  }
}

// Helper function to extract filename from URL path
function extractFilename(imagePath: string): string | null {
  if (!imagePath) return null;
  
  // Handle both /uploads/filename.jpg and full URLs
  const match = imagePath.match(/\/uploads\/(.+)$/);
  return match ? match[1] : null;
}

// DELETE - Xóa sản phẩm và tất cả file ảnh liên quan
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

    // 🔥 GET PRODUCT DATA BEFORE DELETE to collect all image files
    const productToDelete = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        colors: true,
      },
    });

    if (!productToDelete) {
      return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
    }

    // 🗑️ COLLECT ALL IMAGE FILES TO DELETE
    const filesToDelete: string[] = [];
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Add thumbnail
    if (productToDelete.thumbnail) {
      const filename = extractFilename(productToDelete.thumbnail);
      if (filename) {
        filesToDelete.push(path.join(uploadsDir, filename));
      }
    }

    // Add variant images
    for (const variant of productToDelete.variants) {
      if (variant.image) {
        const filename = extractFilename(variant.image);
        if (filename) {
          filesToDelete.push(path.join(uploadsDir, filename));
        }
      }
    }

    // Add color gallery images
    for (const color of productToDelete.colors) {
      const images = Array.isArray(color.images) ? color.images as string[] : [];
      for (const image of images) {
        const filename = extractFilename(image);
        if (filename) {
          filesToDelete.push(path.join(uploadsDir, filename));
        }
      }
    }

    // 🗑️ DELETE ALL IMAGE FILES
    const uniqueFiles = Array.from(new Set(filesToDelete)); // Remove duplicates
    for (const filePath of uniqueFiles) {
      safeDeleteFile(filePath);
    }

    // 🗑️ DELETE PRODUCT FROM DATABASE (cascade variants and colors)
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Xóa sản phẩm thành công. Đã xóa ${uniqueFiles.length} file ảnh.`,
      deletedFiles: uniqueFiles.length,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Không thể xóa sản phẩm" },
      { status: 500 }
    );
  }
}
