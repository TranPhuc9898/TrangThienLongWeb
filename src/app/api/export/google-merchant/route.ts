import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/database";
import * as XLSX from "xlsx";

// Helper function to normalize string for ID (remove Vietnamese diacritics)
function normalizeId(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]/g, "") // Remove special chars and spaces
    .substring(0, 50); // Limit length
}

// Helper function to convert price to VND format
function formatPrice(price: bigint): string {
  return `${price.toString()} VND`;
}

// Helper function to get full image URL
function getFullImageUrl(imagePath: string, baseUrl: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${baseUrl}${imagePath}`;
}

// Helper function to get product link
function getProductLink(slug: string, baseUrl: string): string {
  return `${baseUrl}/shop/product/${slug}`;
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!verifyToken()) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Use production domain instead of localhost
    const baseUrl = "https://trangmobile.com";

    // Fetch all products from database
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

    // Transform products to Google Merchant format
    const merchantData = [];

    for (const product of products) {
      // For products with variants, create separate rows for each variant
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          // Create unique ID for each variant
          const variantId = normalizeId(
            `${product.productName}-${variant.storage}-${variant.color}`
          );

          // Create title with variant details
          const variantTitle = `${product.productName} ${variant.storage} ${variant.color}`;

          merchantData.push({
            id: variantId,
            title: variantTitle,
            description: product.description || product.productName,
            availability: (product.inStock && variant.inStock) ? "in stock" : "out of stock",
            link: getProductLink(product.slug, baseUrl),
            image_link: getFullImageUrl(variant.image || product.thumbnail || "", baseUrl),
            price: formatPrice(variant.price || product.basePrice),
            brand: product.brand,
            condition: product.condition || "used",
            identifier_exists: "no"
          });
        }
      } else {
        // For products without variants, create single row
        const productId = normalizeId(product.productName);

        merchantData.push({
          id: productId,
          title: product.productName,
          description: product.description || product.productName,
          availability: product.inStock ? "in stock" : "out of stock",
          link: getProductLink(product.slug, baseUrl),
          image_link: getFullImageUrl(product.thumbnail || "", baseUrl),
          price: formatPrice(product.basePrice),
          brand: product.brand,
          condition: product.condition || "used",
          identifier_exists: "no"
        });
      }
    }

    // Create Excel workbook
    const wb = XLSX.utils.book_new();

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(merchantData, {
      header: [
        "id",
        "title",
        "description",
        "availability",
        "link",
        "image_link",
        "price",
        "brand",
        "condition",
        "identifier_exists"
      ]
    });

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Google Merchant Feed");

    // Generate Excel buffer
    const excelBuffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx"
    });

    // Return Excel file as response
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="google-merchant-feed-${new Date().getTime()}.xlsx"`,
        "Content-Length": excelBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error("Google Merchant export error:", error);
    return NextResponse.json(
      {
        error: "Không thể tạo file Google Merchant",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  // Same as GET but with POST method for compatibility
  return GET(request);
}