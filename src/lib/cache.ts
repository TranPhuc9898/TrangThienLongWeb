/**
 * Simple in-memory cache for API responses
 * Không cần Redis - chạy trong memory của Node.js process
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache {
  private cache: Map<string, CacheEntry<any>>;
  private defaultTTL: number;

  constructor(defaultTTL: number = 5 * 60 * 1000) {
    // Default 5 phút
    this.cache = new Map();
    this.defaultTTL = defaultTTL;

    // Cleanup expired entries mỗi 10 phút
    setInterval(() => this.cleanup(), 10 * 60 * 1000);
  }

  /**
   * Get cached data or fetch new data
   */
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();
    const maxAge = ttl || this.defaultTTL;

    // Return cached data if still valid
    if (cached && now - cached.timestamp < maxAge) {
      console.log(`✅ Cache HIT: ${key}`);
      return cached.data as T;
    }

    // Fetch new data
    console.log(`❌ Cache MISS: ${key}`);
    const data = await fetcher();

    // Store in cache
    this.cache.set(key, {
      data,
      timestamp: now,
    });

    return data;
  }

  /**
   * Invalidate cache by key or pattern
   */
  invalidate(pattern: string | RegExp) {
    if (typeof pattern === "string") {
      this.cache.delete(pattern);
      console.log(`🗑️ Invalidated cache: ${pattern}`);
    } else {
      // Pattern matching - Convert iterator to array
      const keys = Array.from(this.cache.keys());
      for (const key of keys) {
        if (pattern.test(key)) {
          this.cache.delete(key);
          console.log(`🗑️ Invalidated cache: ${key}`);
        }
      }
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    console.log("🗑️ Cleared all cache");
  }

  /**
   * Cleanup expired entries
   */
  private cleanup() {
    const now = Date.now();
    let cleaned = 0;

    // Convert iterator to array
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > this.defaultTTL) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired cache entries`);
    }
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const cache = new SimpleCache(5 * 60 * 1000); // 5 phút TTL

/**
 * Cache key generators
 */
export const CacheKeys = {
  products: (page: number, limit: number, category?: string) =>
    `products:${page}:${limit}:${category || "all"}`,

  productById: (id: string) => `product:${id}`,

  productBySlug: (slug: string) => `product:slug:${slug}`,

  banners: () => "banners:all",

  search: (query: string) => `search:${query}`,
};

/**
 * Helper để invalidate related caches
 */
export const invalidateProductCaches = () => {
  cache.invalidate(/^products:/);
  cache.invalidate(/^product:/);
  console.log("🗑️ Invalidated all product caches");
};