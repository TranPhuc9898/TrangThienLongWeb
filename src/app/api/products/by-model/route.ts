import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

// Helper function to serialize BigInt values
function serializeBigInt(obj: any): any {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const model = searchParams.get('model');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!model) {
      return NextResponse.json({
        error: 'Thiếu parameter model',
        products: [],
        message: 'Vui lòng cung cấp tên model iPhone'
      }, { status: 400 });
    }

    // Test database connection
    await prisma.$connect();

    // Tìm products theo iphoneModel field chính xác
    const products = await prisma.product.findMany({
      where: {
        iphoneModel: {
          equals: model // Exact match với iphoneModel field
        },
        inStock: true // Chỉ lấy sản phẩm còn hàng
      },
      include: {
        variants: {
          where: {
            inStock: true
          },
          orderBy: [
            { storage: 'asc' },
            { price: 'asc' }
          ]
        },
        colors: true,
        regionPrices: true
      },
      orderBy: [
        { featured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    });

    // Serialize BigInt values
    const serializedProducts = serializeBigInt(products);

    return NextResponse.json({
      products: serializedProducts,
      total: serializedProducts.length,
      model,
      message: serializedProducts.length > 0
        ? `Tìm thấy ${serializedProducts.length} sản phẩm ${model}`
        : `Không tìm thấy sản phẩm ${model} nào`
    });

  } catch (error) {
    console.error('By-Model API Error:', error);
    return NextResponse.json(
      {
        error: 'Lỗi tìm kiếm sản phẩm theo model',
        products: [],
        message: 'Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}