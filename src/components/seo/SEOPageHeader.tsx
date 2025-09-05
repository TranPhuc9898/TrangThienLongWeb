"use client";

import React from 'react';

interface SEOPageHeaderProps {
  h1: string;
  h2List?: string[];
  description?: string;
  showBreadcrumbs?: boolean;
  breadcrumbs?: { name: string; href: string }[];
}

export const SEOPageHeader: React.FC<SEOPageHeaderProps> = ({
  h1,
  h2List = [],
  description,
  showBreadcrumbs = true,
  breadcrumbs = []
}) => {
  return (
    <div className="seo-header-section bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      {/* Breadcrumbs for better navigation */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <nav className="max-w-7xl mx-auto mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-500 hover:text-blue-600">
                Trang chủ
              </a>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <li className="text-gray-400">/</li>
                <li>
                  <a 
                    href={crumb.href} 
                    className={index === breadcrumbs.length - 1 
                      ? "text-gray-900 font-semibold" 
                      : "text-gray-500 hover:text-blue-600"}
                  >
                    {crumb.name}
                  </a>
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      )}

      {/* H1 - Most important heading */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {h1}
        </h1>
        
        {/* SEO optimized description */}
        {description && (
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {/* H2 sections for topic structure */}
        {h2List.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {h2List.map((h2, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  {h2}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust badges */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          100% Chính hãng
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Bảo hành 12 tháng
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Trả góp 0%
        </span>
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Giao hàng 2H
        </span>
      </div>
    </div>
  );
};

// Product-specific SEO header
export const ProductSEOHeader: React.FC<{
  productName: string;
  price: string;
  category: string;
  features: string[];
}> = ({ productName, price, category, features }) => {
  return (
    <div className="product-seo-header">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        {productName} - Giá Chỉ {price}đ Tại Trang Mobile
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Thông Tin Sản Phẩm</h2>
          <ul className="space-y-2">
            <li>✅ Hàng chính hãng Apple Việt Nam</li>
            <li>✅ Bảo hành 12 tháng toàn quốc</li>
            <li>✅ Giá tốt nhất thị trường: {price}đ</li>
            <li>✅ Danh mục: {category}</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3">Tính Năng Nổi Bật</h2>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index}>⭐ {feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Khuyến Mãi Đặc Biệt</h3>
        <ul className="space-y-1 text-sm">
          <li>🎁 Giảm thêm 500.000đ khi thanh toán online</li>
          <li>🎁 Tặng ốp lưng chính hãng trị giá 800.000đ</li>
          <li>🎁 Trả góp 0% lãi suất qua thẻ tín dụng</li>
          <li>🎁 Thu cũ đổi mới, giá thu cao nhất thị trường</li>
        </ul>
      </div>
    </div>
  );
};