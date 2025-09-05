export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  relatedProducts?: string[]; // Product IDs
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export const blogCategories: BlogCategory[] = [
  { id: '1', name: 'Tin tức Apple', slug: 'tin-tuc-apple', description: 'Cập nhật tin tức mới nhất từ Apple' },
  { id: '2', name: 'Đánh giá sản phẩm', slug: 'danh-gia-san-pham', description: 'Review chi tiết các sản phẩm Apple' },
  { id: '3', name: 'Hướng dẫn sử dụng', slug: 'huong-dan-su-dung', description: 'Hướng dẫn sử dụng iPhone, iPad, Mac' },
  { id: '4', name: 'So sánh sản phẩm', slug: 'so-sanh-san-pham', description: 'So sánh chi tiết giữa các dòng sản phẩm' },
  { id: '5', name: 'Tips & Tricks', slug: 'tips-tricks', description: 'Mẹo sử dụng iOS, macOS hiệu quả' },
  { id: '6', name: 'Khuyến mãi', slug: 'khuyen-mai', description: 'Thông tin khuyến mãi và ưu đãi đặc biệt' }
];