"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog.types";
import { Clock, Eye, Heart, User } from "lucide-react";

interface BlogListingProps {
  posts: BlogPost[];
}

export default function BlogListing({ posts }: BlogListingProps) {
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="space-y-8">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Bài viết nổi bật</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map(post => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                itemScope 
                itemType="https://schema.org/BlogPosting"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-video relative">
                    <Image
                      src={post.featuredImage || "/images/blog-placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category.name}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="p-6">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors" itemProp="headline">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-4" itemProp="description">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} phút
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                    </div>
                    <time dateTime={post.publishedAt} itemProp="datePublished">
                      {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                    </time>
                  </div>
                  
                  <meta itemProp="author" content={post.author.name} />
                  <meta itemProp="dateModified" content={post.updatedAt} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Bài viết mới nhất</h2>
        <div className="space-y-6">
          {regularPosts.map(post => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              itemScope 
              itemType="https://schema.org/BlogPosting"
            >
              <div className="flex flex-col md:flex-row">
                <Link href={`/blog/${post.slug}`} className="md:w-1/3">
                  <div className="aspect-video md:aspect-square relative h-full">
                    <Image
                      src={post.featuredImage || "/images/blog-placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                </Link>
                
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 text-sm font-semibold">
                      {post.category.name}
                    </span>
                    <span className="text-gray-400">•</span>
                    <time className="text-gray-500 text-sm" dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                    </time>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-blue-600 transition-colors" itemProp="headline">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-3" itemProp="description">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="text-sm text-gray-600" itemProp="author">
                        {post.author.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} phút
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <meta itemProp="dateModified" content={post.updatedAt} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          1
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
          2
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
          3
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
          Tiếp →
        </button>
      </div>
    </div>
  );
}