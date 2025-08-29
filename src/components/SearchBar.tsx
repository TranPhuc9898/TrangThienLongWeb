"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  productName: string;
  thumbnail: string;
  basePrice: string;
  category: string;
  slug: string;
  inStock: boolean;
  discount?: string;
  variants?: Array<{
    storage: string;
    color: string;
    price: string;
  }>;
}

interface SearchResult {
  products: Product[];
  suggestions: Array<{
    name: string;
    series: string;
    category: string;
  }>;
  popularCategories: Array<{
    name: string;
    count: number;
  }>;
  message: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showSuggestions?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = "", 
  placeholder = "Tìm kiếm iPhone, iPad, MacBook...",
  showSuggestions = true
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Debounced search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=6`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults({
        products: [],
        suggestions: [],
        popularCategories: [],
        message: 'Có lỗi xảy ra khi tìm kiếm'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    saveRecentSearch(finalQuery);
    setIsOpen(false);
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(finalQuery)}`;
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Popular searches
  const popularSearches = [
    'iPhone 15', 'iPhone 14', 'iPhone 13', 
    'iPad Air', 'MacBook Air', 'Apple Watch', 'AirPods Pro'
  ];

  // Format price
  const formatPrice = (price: string) => {
    const numPrice = parseInt(price);
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(numPrice);
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
        
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults(null);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            {loading && (
              <div className="p-4 text-center">
                <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Đang tìm kiếm...</p>
              </div>
            )}

            {!loading && query.length >= 2 && results && (
              <>
                {/* Search Results */}
                {results.products.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Sản phẩm ({results.products.length})
                    </h3>
                    <div className="space-y-3">
                      {results.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/shop/product/${product.slug}`}
                          onClick={() => {
                            saveRecentSearch(query);
                            setIsOpen(false);
                          }}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-12 h-12 relative flex-shrink-0">
                            <Image
                              src={product.thumbnail}
                              alt={product.productName}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.productName}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-red-600">
                                {formatPrice(product.basePrice)}
                              </span>
                              {product.discount && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                                  {product.discount}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                        </Link>
                      ))}
                    </div>
                    
                    {results.products.length >= 6 && (
                      <button
                        onClick={() => handleSearch()}
                        className="w-full mt-3 p-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Xem tất cả kết quả cho "{query}"
                      </button>
                    )}
                  </div>
                )}

                {/* No Results */}
                {results.products.length === 0 && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">{results.message}</p>
                  </div>
                )}
              </>
            )}

            {/* Recent Searches & Popular */}
            {!query && (
              <div className="p-4 space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Tìm kiếm gần đây
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(search);
                            handleSearch(search);
                          }}
                          className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Tìm kiếm phổ biến
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(search);
                          handleSearch(search);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;