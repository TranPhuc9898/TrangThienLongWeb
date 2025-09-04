"use client";

import React from "react";
import Link from "next/link";
import { Search, TrendingUp, Tag, Calendar } from "lucide-react";
import { blogCategories } from "@/types/blog.types";
import { blogPosts } from "@/lib/blog-data";

export default function BlogSidebar() {
  const popularPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 5);
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Tìm kiếm
        </h3>
        <div className="relative">
          <input
            type="search"
            placeholder="Tìm bài viết..."
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Danh mục
        </h3>
        <ul className="space-y-2">
          {blogCategories.map(category => (
            <li key={category.id}>
              <Link 
                href={`/blog/category/${category.slug}`}
                className="flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">
                  ({blogPosts.filter(p => p.category.id === category.id).length})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Bài viết phổ biến
        </h3>
        <ul className="space-y-3">
          {popularPosts.map((post, index) => (
            <li key={post.id} className="flex gap-3">
              <span className="text-2xl font-bold text-gray-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="font-medium hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
                <div className="text-sm text-gray-500 mt-1">
                  {post.views.toLocaleString()} lượt xem
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags Cloud */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4">Tags phổ biến</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
        <h3 className="font-bold text-lg mb-2">Đăng ký nhận tin</h3>
        <p className="text-sm mb-4 text-blue-100">
          Nhận thông tin khuyến mãi và tin tức Apple mới nhất
        </p>
        <input
          type="email"
          placeholder="Email của bạn"
          className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
        />
        <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Đăng ký
        </button>
      </div>

      {/* Recent Comments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Hoạt động gần đây
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="pb-3 border-b">
            <div className="font-medium">Nguyễn Văn A</div>
            <div className="text-gray-600">đã bình luận về "iPhone 15 Pro Max..."</div>
            <div className="text-gray-400 text-xs mt-1">2 giờ trước</div>
          </li>
          <li className="pb-3 border-b">
            <div className="font-medium">Trần Thị B</div>
            <div className="text-gray-600">đã thích "So sánh iPhone 15..."</div>
            <div className="text-gray-400 text-xs mt-1">5 giờ trước</div>
          </li>
          <li>
            <div className="font-medium">Lê Văn C</div>
            <div className="text-gray-600">đã chia sẻ "Tips iOS 17..."</div>
            <div className="text-gray-400 text-xs mt-1">1 ngày trước</div>
          </li>
        </ul>
      </div>
    </div>
  );
}