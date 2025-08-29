"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  ShoppingCart,
  ArrowUpDown,
  ChevronDown,
  X,
  Loader2
} from 'lucide-react';
import SearchBar from '@/components/SearchBar';

interface Product {
  id: string;
  productName: string;
  thumbnail: string;
  basePrice: string;
  category: string;
  slug: string;
  inStock: boolean;
  discount?: string;
  rating: number;
  reviewCount: number;
  variants?: Array<{
    storage: string;
    color: string;
    price: string;
  }>;
}

interface SearchFilters {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  storage: string;
  color: string;
  condition: string;
  inStock: boolean;
  sortBy: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams?.get('q') || '',
    category: searchParams?.get('category') || 'all',
    minPrice: '',
    maxPrice: '',
    storage: '',
    color: '',
    condition: '',
    inStock: true,
    sortBy: 'relevance'
  });

  // Categories for filter
  const categories = [
    { value: 'all', label: 'Tất cả sản phẩm' },
    { value: 'iphone', label: 'iPhone' },
    { value: 'ipad', label: 'iPad' },
    { value: 'mac', label: 'Mac' },
    { value: 'watch', label: 'Apple Watch' },
    { value: 'airpods', label: 'AirPods' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'relevance', label: 'Liên quan nhất' },
    { value: 'price_low_to_high', label: 'Giá thấp đến cao' },
    { value: 'price_high_to_low', label: 'Giá cao đến thấp' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'name_a_z', label: 'Tên A-Z' },
  ];

  // Storage options
  const storageOptions = [
    '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'
  ];

  // Condition options
  const conditionOptions = [
    { value: '', label: 'Tất cả tình trạng' },
    { value: '99%', label: '99%' },
    { value: 'New', label: 'Mới 100%' },
    { value: 'Refurbished', label: 'Refurbished' },
  ];

  // Fetch search results
  const fetchSearchResults = async () => {
    if (!filters.query.trim()) {
      setProducts([]);
      setTotalResults(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const searchBody = {
        query: filters.query,
        category: filters.category === 'all' ? '' : filters.category,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
        storage: filters.storage,
        color: filters.color,
        condition: filters.condition,
        inStock: filters.inStock,
        sortBy: filters.sortBy,
        page: currentPage,
        limit: 20
      };

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchBody),
      });

      const data = await response.json();
      
      if (data.products) {
        setProducts(data.products);
        setTotalResults(data.pagination?.total || data.products.length);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        setProducts([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Search error:', error);
      setProducts([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Update search when filters change
  useEffect(() => {
    fetchSearchResults();
  }, [filters, currentPage]);

  // Update filters when URL params change
  useEffect(() => {
    const newQuery = searchParams?.get('q') || '';
    const newCategory = searchParams?.get('category') || 'all';
    
    if (newQuery !== filters.query || newCategory !== filters.category) {
      setFilters(prev => ({
        ...prev,
        query: newQuery,
        category: newCategory
      }));
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Handle filter change
  const handleFilterChange = (key: keyof SearchFilters, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      query: filters.query,
      category: 'all',
      minPrice: '',
      maxPrice: '',
      storage: '',
      color: '',
      condition: '',
      inStock: true,
      sortBy: 'relevance'
    });
  };

  // Format price
  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  // Calculate discount price
  const getDiscountPrice = (basePrice: string, discount?: string) => {
    if (!discount) return basePrice;
    
    const price = parseInt(basePrice);
    const discountValue = parseFloat(discount.replace('%', '').replace('-', ''));
    
    if (discount.includes('%')) {
      return (price * (1 - discountValue / 100)).toString();
    }
    return (price - discountValue).toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              className="w-full"
              placeholder="Tìm kiếm sản phẩm..."
              showSuggestions={true}
            />
          </div>
          
          {filters.query && (
            <div className="mt-4 text-center">
              <h1 className="text-lg font-semibold text-gray-900">
                Kết quả tìm kiếm cho "{filters.query}"
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {loading ? 'Đang tìm kiếm...' : `${totalResults} sản phẩm được tìm thấy`}
              </p>
            </div>
          )}
        </div>

        {filters.query && (
          <>
            {/* Filters and Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Filters Toggle & Active Filters */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Bộ lọc</span>
                  </button>

                  {/* Active Filters */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {filters.category !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {categories.find(c => c.value === filters.category)?.label}
                        <button onClick={() => handleFilterChange('category', 'all')}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {filters.storage && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {filters.storage}
                        <button onClick={() => handleFilterChange('storage', '')}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {(filters.minPrice || filters.maxPrice) && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Giá: {filters.minPrice || '0'} - {filters.maxPrice || '∞'}
                        <button onClick={() => {
                          handleFilterChange('minPrice', '');
                          handleFilterChange('maxPrice', '');
                        }}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Sort & View Toggle */}
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-gray-500" />
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Storage Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dung lượng
                      </label>
                      <select
                        value={filters.storage}
                        onChange={(e) => handleFilterChange('storage', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Tất cả dung lượng</option>
                        {storageOptions.map(storage => (
                          <option key={storage} value={storage}>
                            {storage}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Khoảng giá (triệu)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Từ"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Đến"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Condition Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tình trạng
                      </label>
                      <select
                        value={filters.condition}
                        onChange={(e) => handleFilterChange('condition', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {conditionOptions.map(condition => (
                          <option key={condition.value} value={condition.value}>
                            {condition.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  <span className="ml-2 text-gray-600">Đang tải kết quả...</span>
                </div>
              ) : products.length > 0 ? (
                <>
                  {/* Products Grid/List */}
                  <div className={
                    viewMode === 'grid'
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }>
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {viewMode === 'grid' ? (
                          // Grid View Card
                          <Link href={`/shop/product/${product.slug}`}>
                            <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="relative aspect-square mb-4">
                                <Image
                                  src={product.thumbnail}
                                  alt={product.productName}
                                  fill
                                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.discount && (
                                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    {product.discount}
                                  </div>
                                )}
                                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                              </div>
                              
                              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {product.productName}
                              </h3>
                              
                              <div className="flex items-center mb-2">
                                <div className="flex items-center mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(product.rating)
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">
                                  ({product.reviewCount})
                                </span>
                              </div>
                              
                              <div className="space-y-1">
                                {product.discount ? (
                                  <>
                                    <div className="text-lg font-bold text-red-600">
                                      {formatPrice(getDiscountPrice(product.basePrice, product.discount))}
                                    </div>
                                    <div className="text-sm text-gray-500 line-through">
                                      {formatPrice(product.basePrice)}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-lg font-bold text-gray-900">
                                    {formatPrice(product.basePrice)}
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-3">
                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          // List View Card
                          <Link href={`/shop/product/${product.slug}`}>
                            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 group">
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={product.thumbnail}
                                  alt={product.productName}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                                {product.discount && (
                                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                                    {product.discount}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                  {product.productName}
                                </h3>
                                
                                <div className="flex items-center mb-2">
                                  <div className="flex items-center mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < Math.floor(product.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    ({product.reviewCount})
                                  </span>
                                  <span className="ml-auto text-xs text-gray-500">
                                    {product.category}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  {product.discount ? (
                                    <>
                                      <div className="text-lg font-bold text-red-600">
                                        {formatPrice(getDiscountPrice(product.basePrice, product.discount))}
                                      </div>
                                      <div className="text-sm text-gray-500 line-through">
                                        {formatPrice(product.basePrice)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-lg font-bold text-gray-900">
                                      {formatPrice(product.basePrice)}
                                    </div>
                                  )}
                                </div>
                                
                                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                              </div>
                            </div>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Trước
                        </button>
                      )}
                      
                      <span className="px-4 py-2 text-sm text-gray-600">
                        Trang {currentPage} / {totalPages}
                      </span>
                      
                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Sau
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                // No Results
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy kết quả nào
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* No Query State */}
        {!filters.query && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nhập từ khóa để tìm kiếm sản phẩm
            </h3>
            <p className="text-gray-500">
              Tìm kiếm iPhone, iPad, MacBook, Apple Watch và nhiều sản phẩm khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchPageWithSuspense = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    }>
      <SearchPage />
    </Suspense>
  );
};

export default SearchPageWithSuspense;