"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  Search,
  Sliders,
  Smartphone,
  Palette,
  HardDrive,
  DollarSign,
  Star,
} from "lucide-react";
import { Product } from "@/types/product.types";

interface AdvancedFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

interface FilterState {
  search: string;
  priceRange: [number, number];
  storage: string[];
  colors: string[];
  models: string[];
  condition: string[];
  rating: number;
  inStock: boolean;
}

// 🎯 Advanced Filter System for iPhone
const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  products,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: [0, 50000000],
    storage: [],
    colors: [],
    models: [],
    condition: [],
    rating: 0,
    inStock: false,
  });

  // Determine iPhone model from a name (hoisted before usage)
  function extractModel(name: string): string {
    const matches = name.match(/iPhone\s+(\d+(?:\s+Pro(?:\s+Max)?)?)/i);
    return matches ? `iPhone ${matches[1]}` : "";
  }

  // Extract unique filter options from products
  const filterOptions = React.useMemo(() => {
    const storages = new Set<string>();
    const colors = new Set<string>();
    const models = new Set<string>();
    const conditions = new Set<string>();

    products.forEach((product) => {
      // Storage options from variants
      product.variants?.forEach((variant) => {
        storages.add(variant.storage);
        colors.add(variant.color);
      });

      // Models (iPhone 15, iPhone 14, etc.)
      const model = extractModel(product.productName || product.title || "");
      if (model) models.add(model);

      // Conditions
      if (product.condition) conditions.add(product.condition);
    });

    return {
      storages: Array.from(storages).sort((a, b) => {
        const sizeA = parseInt(a.replace(/[^\d]/g, ""));
        const sizeB = parseInt(b.replace(/[^\d]/g, ""));
        return sizeA - sizeB;
      }),
      colors: Array.from(colors).sort(),
      models: Array.from(models).sort(),
      conditions: Array.from(conditions).sort(),
    };
  }, [products]);

  const applyFilters = React.useCallback(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          (product.productName || product.title || "")
            .toLowerCase()
            .includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = Number(product.basePrice || product.price || 0);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Storage filter
    if (filters.storage.length > 0) {
      filtered = filtered.filter((product) =>
        product.variants?.some((variant) =>
          filters.storage.includes(variant.storage)
        )
      );
    }

    // Colors filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.variants?.some((variant) =>
          filters.colors.includes(variant.color)
        )
      );
    }

    // Models filter
    if (filters.models.length > 0) {
      filtered = filtered.filter((product) => {
        const model = extractModel(product.productName || product.title || "");
        return filters.models.includes(model);
      });
    }

    // Condition filter
    if (filters.condition.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.condition && filters.condition.includes(product.condition)
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    onFilterChange(filtered);
  }, [products, filters, onFilterChange]);

  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = <
    K extends keyof Pick<
      FilterState,
      "storage" | "colors" | "models" | "condition"
    >
  >(
    key: K,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      priceRange: [0, 50000000],
      storage: [],
      colors: [],
      models: [],
      condition: [],
      rating: 0,
      inStock: false,
    });
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.storage.length > 0 ? 1 : 0) +
    (filters.colors.length > 0 ? 1 : 0) +
    (filters.models.length > 0 ? 1 : 0) +
    (filters.condition.length > 0 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  return (
    <>
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-medium">Bộ Lọc</span>
        {activeFiltersCount > 0 && (
          <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-6 h-6 text-gray-700" />
                    <h2 className="text-xl font-bold">Bộ Lọc iPhone</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Xóa tất cả bộ lọc ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Filter Content */}
              <div className="p-6 space-y-8">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Search className="w-4 h-4 inline mr-2" />
                    Tìm kiếm
                  </label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    placeholder="Nhập tên iPhone..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Khoảng giá
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      step="1000000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        updateFilter("priceRange", [0, Number(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0đ</span>
                      <span className="font-semibold">
                        Tối đa: {filters.priceRange[1].toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>

                {/* iPhone Models */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Dòng iPhone
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.models.map((model) => (
                      <button
                        key={model}
                        onClick={() => toggleArrayFilter("models", model)}
                        className={`p-3 rounded-lg text-sm font-medium border transition-colors ${
                          filters.models.includes(model)
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <HardDrive className="w-4 h-4 inline mr-2" />
                    Dung lượng
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.storages.map((storage) => (
                      <button
                        key={storage}
                        onClick={() => toggleArrayFilter("storage", storage)}
                        className={`p-3 rounded-lg text-sm font-medium border transition-colors ${
                          filters.storage.includes(storage)
                            ? "bg-purple-500 text-white border-purple-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Palette className="w-4 h-4 inline mr-2" />
                    Màu sắc
                  </label>
                  <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                    {filterOptions.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleArrayFilter("colors", color)}
                        className={`p-3 rounded-lg text-sm font-medium border transition-colors text-left ${
                          filters.colors.includes(color)
                            ? "bg-pink-500 text-white border-pink-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tình trạng
                  </label>
                  <div className="space-y-2">
                    {filterOptions.conditions.map((condition) => (
                      <button
                        key={condition}
                        onClick={() =>
                          toggleArrayFilter("condition", condition)
                        }
                        className={`w-full p-3 rounded-lg text-sm font-medium border transition-colors text-left ${
                          filters.condition.includes(condition)
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {condition}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Star className="w-4 h-4 inline mr-2" />
                    Đánh giá tối thiểu
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() =>
                          updateFilter(
                            "rating",
                            filters.rating === rating ? 0 : rating
                          )
                        }
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
                          filters.rating >= rating
                            ? "bg-yellow-400 text-white border-yellow-400"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) =>
                        updateFilter("inStock", e.target.checked)
                      }
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Chỉ hiển thị sản phẩm còn hàng
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Áp dụng bộ lọc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedFilters;
