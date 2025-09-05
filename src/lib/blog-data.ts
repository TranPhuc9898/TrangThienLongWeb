import { BlogPost } from "@/types/blog.types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "iphone-15-pro-max-danh-gia-chi-tiet",
    title: "Đánh giá chi tiết iPhone 15 Pro Max: Xứng đáng từng đồng",
    excerpt: "iPhone 15 Pro Max với chip A17 Pro, camera zoom 5x và khung titan mang lại trải nghiệm cao cấp nhất từ Apple.",
    content: `
      <h2>Thiết kế khung Titan cao cấp</h2>
      <p>iPhone 15 Pro Max sử dụng khung titan Grade 5 - cùng loại vật liệu được sử dụng trong ngành hàng không vũ trụ. Điều này giúp máy nhẹ hơn 19% so với thế hệ trước nhưng vẫn cực kỳ bền bỉ.</p>
      
      <h2>Hiệu năng A17 Pro đột phá</h2>
      <p>Chip A17 Pro được sản xuất trên tiến trình 3nm đầu tiên trong ngành, mang lại hiệu năng CPU nhanh hơn 10% và GPU mạnh hơn 20% so với A16 Bionic.</p>
      
      <h3>Điểm benchmark ấn tượng</h3>
      <ul>
        <li>Geekbench 6 Single-Core: 2,900+</li>
        <li>Geekbench 6 Multi-Core: 7,200+</li>
        <li>AnTuTu: 1,600,000+</li>
      </ul>
      
      <h2>Camera zoom 5x Tetraprism</h2>
      <p>Công nghệ Tetraprism độc quyền cho phép zoom quang học 5x trong thân máy mỏng, chất lượng ảnh sắc nét ngay cả khi zoom xa.</p>
      
      <h2>Thời lượng pin ấn tượng</h2>
      <p>Pin 4,422mAh cho thời gian sử dụng lên đến 29 giờ xem video, tăng đáng kể so với iPhone 14 Pro Max.</p>
      
      <h2>Kết luận</h2>
      <p>iPhone 15 Pro Max là smartphone cao cấp nhất hiện nay với nhiều công nghệ đột phá. Giá khởi điểm từ 29.990.000đ tại Trang Thiên Long Mobile.</p>
    `,
    featuredImage: "/images/blog/iphone-15-pro-max-review.jpg",
    category: { id: "2", name: "Đánh giá sản phẩm", slug: "danh-gia-san-pham", description: "" },
    tags: ["iPhone 15 Pro Max", "Review", "Apple", "Flagship"],
    author: {
      id: "1",
      name: "Nguyễn Văn Tech",
      avatar: "/images/authors/tech-reviewer.jpg",
      bio: "Chuyên gia đánh giá công nghệ với 5 năm kinh nghiệm",
      role: "Tech Reviewer"
    },
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: 8,
    views: 15234,
    likes: 892,
    seoTitle: "Review iPhone 15 Pro Max chi tiết - Đánh giá sau 3 tháng sử dụng",
    seoDescription: "Đánh giá chi tiết iPhone 15 Pro Max sau 3 tháng sử dụng thực tế. Camera zoom 5x, chip A17 Pro, pin khủng.",
    seoKeywords: ["iphone 15 pro max", "review iphone", "đánh giá iphone"],
    relatedProducts: ["iphone-15-pro-max-256gb", "iphone-15-pro-max-512gb"],
    featured: true
  },
  {
    id: "2",
    slug: "so-sanh-iphone-15-vs-iphone-14",
    title: "So sánh iPhone 15 và iPhone 14: Nên nâng cấp không?",
    excerpt: "Phân tích chi tiết sự khác biệt giữa iPhone 15 và iPhone 14 để giúp bạn đưa ra quyết định nâng cấp.",
    content: `
      <h2>Điểm khác biệt chính</h2>
      <table>
        <tr><th>Tính năng</th><th>iPhone 15</th><th>iPhone 14</th></tr>
        <tr><td>Chip</td><td>A16 Bionic</td><td>A15 Bionic</td></tr>
        <tr><td>Camera</td><td>48MP chính</td><td>12MP chính</td></tr>
        <tr><td>Cổng sạc</td><td>USB-C</td><td>Lightning</td></tr>
        <tr><td>Dynamic Island</td><td>Có</td><td>Không</td></tr>
      </table>
      
      <h2>Hiệu năng</h2>
      <p>iPhone 15 với A16 Bionic nhanh hơn 15-20% so với A15 Bionic trên iPhone 14.</p>
      
      <h2>Camera nâng cấp đáng giá</h2>
      <p>Camera 48MP mới cho khả năng zoom 2x không mất chất lượng và chụp ảnh chi tiết hơn.</p>
      
      <h2>Kết luận</h2>
      <p>Nếu bạn đang dùng iPhone 14, việc nâng cấp lên iPhone 15 không thực sự cần thiết. Tuy nhiên, từ iPhone 13 trở xuống thì đáng cân nhắc.</p>
    `,
    featuredImage: "/images/blog/iphone-15-vs-14.jpg",
    category: { id: "4", name: "So sánh sản phẩm", slug: "so-sanh-san-pham", description: "" },
    tags: ["iPhone 15", "iPhone 14", "So sánh"],
    author: {
      id: "1",
      name: "Nguyễn Văn Tech",
      avatar: "/images/authors/tech-reviewer.jpg",
      bio: "Chuyên gia đánh giá công nghệ với 5 năm kinh nghiệm",
      role: "Tech Reviewer"
    },
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10",
    readTime: 6,
    views: 8923,
    likes: 456,
    relatedProducts: ["iphone-15", "iphone-14"],
    featured: false
  },
  {
    id: "3",
    slug: "huong-dan-su-dung-ios-17-hieu-qua",
    title: "20+ Tính năng iOS 17 bạn cần biết để dùng iPhone hiệu quả",
    excerpt: "Khám phá những tính năng mới và tips sử dụng iOS 17 giúp tận dụng tối đa iPhone của bạn.",
    content: `
      <h2>1. StandBy Mode - Biến iPhone thành đồng hồ thông minh</h2>
      <p>Khi sạc ngang, iPhone sẽ hiển thị đồng hồ, lịch, widget...</p>
      
      <h2>2. Contact Posters - Tùy chỉnh hình ảnh khi gọi điện</h2>
      <p>Tạo poster cá nhân hiển thị khi bạn gọi cho người khác.</p>
      
      <h2>3. Live Voicemail - Xem nội dung tin nhắn thoại trực tiếp</h2>
      <p>iOS 17 cho phép xem text của voicemail trong thời gian thực.</p>
      
      <h2>4. Offline Maps - Dùng bản đồ không cần mạng</h2>
      <p>Tải trước bản đồ để dùng offline khi đi du lịch.</p>
      
      <h2>5. Interactive Widgets - Widget tương tác</h2>
      <p>Thao tác trực tiếp với widget mà không cần mở app.</p>
      
      <h2>Tips nâng cao</h2>
      <ul>
        <li>Dùng Back Tap để chụp màn hình nhanh</li>
        <li>Tùy chỉnh Control Center theo nhu cầu</li>
        <li>Sử dụng Focus Mode để tập trung làm việc</li>
      </ul>
    `,
    featuredImage: "/images/blog/ios-17-tips.jpg",
    category: { id: "5", name: "Tips & Tricks", slug: "tips-tricks", description: "" },
    tags: ["iOS 17", "Tips", "Hướng dẫn"],
    author: {
      id: "2",
      name: "Lê Thị Guide",
      avatar: "/images/authors/guide-expert.jpg",
      bio: "Chuyên viên hướng dẫn sử dụng sản phẩm Apple",
      role: "Guide Expert"
    },
    publishedAt: "2024-01-08",
    updatedAt: "2024-01-08",
    readTime: 10,
    views: 12456,
    likes: 723,
    featured: true
  },
  {
    id: "4",
    slug: "macbook-air-m3-ra-mat",
    title: "MacBook Air M3 chính thức: Hiệu năng mạnh mẽ, pin 18 giờ",
    excerpt: "Apple vừa ra mắt MacBook Air M3 với hiệu năng tăng 60% so với M1, hỗ trợ 2 màn hình ngoài.",
    content: `
      <h2>Chip M3 mạnh mẽ</h2>
      <p>MacBook Air M3 sử dụng chip Apple M3 tiến trình 3nm với 8-core CPU và 10-core GPU...</p>
      
      <h2>Thời lượng pin ấn tượng</h2>
      <p>Pin lên đến 18 giờ xem video, 15 giờ duyệt web qua Wi-Fi...</p>
      
      <h2>Giá bán và ngày lên kệ</h2>
      <p>MacBook Air M3 13 inch giá từ 27.990.000đ, bản 15 inch từ 32.990.000đ tại Trang Thiên Long.</p>
    `,
    featuredImage: "/images/blog/macbook-air-m3.jpg",
    category: { id: "1", name: "Tin tức Apple", slug: "tin-tuc-apple", description: "" },
    tags: ["MacBook Air", "M3", "Apple"],
    author: {
      id: "3",
      name: "Trần Văn News",
      avatar: "/images/authors/news-editor.jpg",
      bio: "Biên tập viên tin tức công nghệ",
      role: "News Editor"
    },
    publishedAt: "2024-01-05",
    updatedAt: "2024-01-05",
    readTime: 5,
    views: 6789,
    likes: 234,
    relatedProducts: ["macbook-air-m3-13", "macbook-air-m3-15"],
    featured: false
  },
  {
    id: "5",
    slug: "khuyen-mai-tet-2024",
    title: "Khuyến mãi Tết 2024: Giảm đến 5 triệu cho iPhone, iPad",
    excerpt: "Chương trình khuyến mãi lớn nhất năm với ưu đãi cực khủng cho các sản phẩm Apple.",
    content: `
      <h2>Ưu đãi iPhone</h2>
      <ul>
        <li>iPhone 15 Pro Max: Giảm 3 triệu + Tặng ốp lưng</li>
        <li>iPhone 15: Giảm 2 triệu + Trả góp 0%</li>
        <li>iPhone 14: Giảm đến 5 triệu</li>
      </ul>
      
      <h2>Ưu đãi iPad</h2>
      <ul>
        <li>iPad Pro M2: Giảm 4 triệu</li>
        <li>iPad Air: Giảm 2 triệu + Tặng bút Apple Pencil</li>
      </ul>
      
      <h2>Quà tặng kèm</h2>
      <p>Tất cả khách hàng đều được tặng: Bảo hành 12 tháng, ốp lưng cao cấp, cường lực...</p>
    `,
    featuredImage: "/images/blog/tet-sale-2024.jpg",
    category: { id: "6", name: "Khuyến mãi", slug: "khuyen-mai", description: "" },
    tags: ["Khuyến mãi", "Tết 2024", "Sale"],
    author: {
      id: "4",
      name: "Admin",
      avatar: "/images/authors/admin.jpg",
      bio: "Quản trị viên website",
      role: "Admin"
    },
    publishedAt: "2024-01-01",
    updatedAt: "2024-01-01",
    readTime: 3,
    views: 25678,
    likes: 1234,
    featured: true
  }
];