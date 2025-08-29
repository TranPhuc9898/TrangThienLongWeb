import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query || query.length < 2) {
      return NextResponse.json({ 
        products: [], 
        message: 'Vui lòng nhập ít nhất 2 ký tự để tìm kiếm' 
      });
    }

    // Build search conditions (SQLite doesn't support mode: 'insensitive')
    const searchConditions: any = {
      OR: [
        {
          productName: {
            contains: query
          }
        },
        {
          tag: {
            contains: query
          }
        },
        {
          series: {
            contains: query
          }
        },
        {
          description: {
            contains: query
          }
        }
      ],
      inStock: true // Only show in-stock products
    };

    // Add category filter if provided
    if (category && category !== 'all') {
      searchConditions.category = {
        contains: category
      };
    }

    // Search products with variants and colors
    const products = await prisma.product.findMany({
      where: searchConditions,
      include: {
        variants: {
          where: {
            inStock: true
          },
          orderBy: {
            price: 'asc'
          }
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

    // Transform data for response
    const transformedProducts = products.map(product => ({
      id: product.id,
      productName: product.productName,
      brand: product.brand,
      condition: product.condition,
      slug: product.slug,
      tag: product.tag,
      regionCode: product.regionCode,
      series: product.series,
      basePrice: product.basePrice.toString(),
      currency: product.currency,
      discount: product.discount,
      thumbnail: product.thumbnail,
      description: product.description,
      promotionGeneral: product.promotionGeneral,
      promotionStudent: product.promotionStudent,
      installment: product.installment,
      category: product.category,
      rating: product.rating,
      reviewCount: product.reviewCount,
      featured: product.featured,
      inStock: product.inStock,
      variants: product.variants.map(variant => ({
        id: variant.id,
        storage: variant.storage,
        color: variant.color,
        price: variant.price.toString(),
        image: variant.image,
        inStock: variant.inStock,
        quantity: variant.quantity
      })),
      colors: product.colors.map(color => ({
        id: color.id,
        color: color.color,
        images: color.images
      })),
      regionPrices: product.regionPrices.map(price => ({
        id: price.id,
        regionCode: price.regionCode,
        price: price.price.toString()
      })),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    }));

    // Get search suggestions based on query
    const suggestions = await prisma.product.findMany({
      where: {
        OR: [
          {
            productName: {
              contains: query
            }
          },
          {
            series: {
              contains: query
            }
          }
        ],
        inStock: true
      },
      select: {
        productName: true,
        series: true,
        category: true
      },
      distinct: ['productName'],
      take: 5
    });

    // Get popular categories for suggestions
    const popularCategories = await prisma.product.groupBy({
      by: ['category'],
      where: {
        inStock: true,
        featured: true
      },
      _count: {
        category: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      },
      take: 5
    });

    return NextResponse.json({
      products: transformedProducts,
      total: transformedProducts.length,
      query,
      category: category || 'all',
      suggestions: suggestions.map(s => ({
        name: s.productName,
        series: s.series,
        category: s.category
      })),
      popularCategories: popularCategories.map(cat => ({
        name: cat.category,
        count: cat._count.category
      })),
      message: transformedProducts.length > 0 
        ? `Tìm thấy ${transformedProducts.length} sản phẩm`
        : 'Không tìm thấy sản phẩm nào phù hợp'
    });

  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { 
        error: 'Lỗi tìm kiếm sản phẩm', 
        products: [],
        message: 'Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.' 
      },
      { status: 500 }
    );
  }
}

// POST method for advanced search with filters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query,
      category,
      minPrice,
      maxPrice,
      storage,
      color,
      condition,
      regionCode,
      inStock = true,
      featured,
      sortBy = 'relevance',
      limit = 20,
      page = 1
    } = body;

    if (!query || query.length < 2) {
      return NextResponse.json({ 
        products: [], 
        message: 'Vui lòng nhập ít nhất 2 ký tự để tìm kiếm' 
      });
    }

    const skip = (page - 1) * limit;

    // Build advanced search conditions (SQLite doesn't support mode: 'insensitive')
    const searchConditions: any = {
      OR: [
        {
          productName: {
            contains: query
          }
        },
        {
          tag: {
            contains: query
          }
        },
        {
          series: {
            contains: query
          }
        }
      ]
    };

    // Add filters
    if (category && category !== 'all') {
      searchConditions.category = {
        contains: category
      };
    }

    if (condition) {
      searchConditions.condition = condition;
    }

    if (regionCode) {
      searchConditions.regionCode = regionCode;
    }

    if (typeof inStock === 'boolean') {
      searchConditions.inStock = inStock;
    }

    if (typeof featured === 'boolean') {
      searchConditions.featured = featured;
    }

    // Price range filter (applied to variants)
    const variantConditions: any = {};
    if (minPrice || maxPrice) {
      variantConditions.price = {};
      if (minPrice) variantConditions.price.gte = BigInt(minPrice * 100); // Convert to cents
      if (maxPrice) variantConditions.price.lte = BigInt(maxPrice * 100); // Convert to cents
    }

    if (storage) {
      variantConditions.storage = storage;
    }

    if (color) {
      variantConditions.color = {
        contains: color
      };
    }

    if (inStock) {
      variantConditions.inStock = true;
    }

    // Build orderBy based on sortBy
    let orderBy: any = [{ featured: 'desc' }];
    
    switch (sortBy) {
      case 'price_low_to_high':
        orderBy = [{ basePrice: 'asc' }];
        break;
      case 'price_high_to_low':
        orderBy = [{ basePrice: 'desc' }];
        break;
      case 'rating':
        orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
        break;
      case 'newest':
        orderBy = [{ createdAt: 'desc' }];
        break;
      case 'name_a_z':
        orderBy = [{ productName: 'asc' }];
        break;
      case 'name_z_a':
        orderBy = [{ productName: 'desc' }];
        break;
      default: // relevance
        orderBy = [
          { featured: 'desc' },
          { rating: 'desc' },
          { reviewCount: 'desc' }
        ];
    }

    // Get total count for pagination
    const totalCount = await prisma.product.count({
      where: searchConditions
    });

    // Search products
    const products = await prisma.product.findMany({
      where: searchConditions,
      include: {
        variants: {
          where: variantConditions,
          orderBy: { price: 'asc' }
        },
        colors: true,
        regionPrices: true
      },
      orderBy,
      skip,
      take: limit
    });

    // Filter out products with no matching variants if variant filters were applied
    const filteredProducts = products.filter(product => {
      if (Object.keys(variantConditions).length === 0) return true;
      return product.variants.length > 0;
    });

    // Transform data for response (same as GET method)
    const transformedProducts = filteredProducts.map(product => ({
      id: product.id,
      productName: product.productName,
      brand: product.brand,
      condition: product.condition,
      slug: product.slug,
      tag: product.tag,
      regionCode: product.regionCode,
      series: product.series,
      basePrice: product.basePrice.toString(),
      currency: product.currency,
      discount: product.discount,
      thumbnail: product.thumbnail,
      description: product.description,
      promotionGeneral: product.promotionGeneral,
      promotionStudent: product.promotionStudent,
      installment: product.installment,
      category: product.category,
      rating: product.rating,
      reviewCount: product.reviewCount,
      featured: product.featured,
      inStock: product.inStock,
      variants: product.variants.map(variant => ({
        id: variant.id,
        storage: variant.storage,
        color: variant.color,
        price: variant.price.toString(),
        image: variant.image,
        inStock: variant.inStock,
        quantity: variant.quantity
      })),
      colors: product.colors.map(color => ({
        id: color.id,
        color: color.color,
        images: color.images
      })),
      regionPrices: product.regionPrices.map(price => ({
        id: price.id,
        regionCode: price.regionCode,
        price: price.price.toString()
      })),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: skip + limit < totalCount
      },
      filters: {
        query,
        category,
        minPrice,
        maxPrice,
        storage,
        color,
        condition,
        regionCode,
        inStock,
        featured,
        sortBy
      },
      message: transformedProducts.length > 0 
        ? `Tìm thấy ${transformedProducts.length} sản phẩm (${totalCount} tổng cộng)`
        : 'Không tìm thấy sản phẩm nào phù hợp với bộ lọc'
    });

  } catch (error) {
    console.error('Advanced Search API Error:', error);
    return NextResponse.json(
      { 
        error: 'Lỗi tìm kiếm sản phẩm', 
        products: [],
        message: 'Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.' 
      },
      { status: 500 }
    );
  }
}