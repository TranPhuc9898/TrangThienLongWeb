// SEO optimized content for all pages
export const SEO_CONTENT = {
  // Homepage
  home: {
    title: "iPhone Chính Hãng Giá Rẻ Nhất 2024 | iPad, MacBook, Apple Watch | Trang Mobile",
    description: "⭐ Mua iPhone 15, iPhone 14 chính hãng giá tốt nhất Việt Nam ✅ Trả góp 0% ✅ Bảo hành 12 tháng ✅ Giao hàng 2H TP.HCM. Giảm đến 5 triệu + Quà tặng",
    keywords: ["iphone giá rẻ", "iphone chính hãng", "ipad giá tốt", "macbook m3", "apple watch", "airpods pro 2", "trang mobile"],
    h1: "Cửa Hàng iPhone Chính Hãng - Giá Tốt Nhất TP.HCM",
    content: `Trang Mobile là địa chỉ tin cậy mua iPhone, iPad, MacBook, Apple Watch chính hãng với giá tốt nhất thị trường. 
    Chúng tôi cam kết 100% hàng chính hãng Apple, bảo hành 12 tháng, hỗ trợ trả góp 0% lãi suất. 
    Với hơn 5 năm kinh nghiệm và 50,000+ khách hàng tin tưởng, Trang Mobile tự hào là cửa hàng Apple uy tín hàng đầu TP.HCM.`
  },

  // iPhone pages
  iphone: {
    title: "iPhone 15 Pro Max, iPhone 14 Giá Rẻ Nhất 2024 | Trả Góp 0% | Trang Mobile",
    description: "✅ iPhone 15 Pro Max từ 28.990.000đ ✅ iPhone 14 Pro Max từ 24.990.000đ ✅ Giảm đến 5 triệu ✅ Trả góp 0% ✅ Đổi cũ lấy mới ✅ Giao hàng 2H",
    keywords: ["iphone 15 pro max", "iphone 14 pro", "iphone 13", "iphone giá rẻ", "iphone trả góp"],
    h1: "iPhone Chính Hãng - Giá Tốt Nhất Việt Nam",
    h2: ["iPhone 15 Series Mới Nhất", "iPhone 14 Giảm Sốc", "iPhone 13 Giá Tốt", "Chính Sách Ưu Đãi"]
  },

  // iPad pages
  ipad: {
    title: "iPad Pro M4, iPad Air, iPad Gen 10 Chính Hãng | Giá Rẻ Nhất | Trang Mobile",
    description: "⭐ iPad Pro M4 2024 từ 28.990.000đ ⭐ iPad Air M2 từ 16.990.000đ ⭐ iPad Gen 10 từ 11.990.000đ. Trả góp 0%, giao hàng miễn phí toàn quốc",
    keywords: ["ipad pro m4", "ipad air m2", "ipad gen 10", "ipad mini 6", "máy tính bảng apple"],
    h1: "iPad Chính Hãng - Máy Tính Bảng Apple Giá Tốt",
    h2: ["iPad Pro M4 2024", "iPad Air M2", "iPad Gen 10 Giá Rẻ", "iPad Mini 6"]
  },

  // MacBook pages
  macbook: {
    title: "MacBook Air M3, MacBook Pro M3 Max Chính Hãng | Giá Tốt Nhất 2024",
    description: "💻 MacBook Air M3 từ 27.990.000đ 💻 MacBook Pro M3 Max từ 44.990.000đ. Bảo hành Apple Care+, trả góp 0%, tặng phụ kiện 2 triệu",
    keywords: ["macbook air m3", "macbook pro m3 max", "macbook m2", "laptop apple", "macbook giá rẻ"],
    h1: "MacBook Chính Hãng - Laptop Apple Cao Cấp",
    h2: ["MacBook Air M3 2024", "MacBook Pro M3 Max", "MacBook Giá Tốt", "So Sánh MacBook"]
  },

  // Apple Watch pages
  watch: {
    title: "Apple Watch Series 9, Ultra 2, SE 2023 | Giá Rẻ Nhất | Trang Mobile",
    description: "⌚ Apple Watch Series 9 từ 9.990.000đ ⌚ Apple Watch Ultra 2 từ 20.990.000đ ⌚ Watch SE từ 6.490.000đ. Bảo hành chính hãng 12 tháng",
    keywords: ["apple watch series 9", "apple watch ultra 2", "apple watch se", "đồng hồ apple", "smartwatch"],
    h1: "Apple Watch - Đồng Hồ Thông Minh Chính Hãng",
    h2: ["Apple Watch Series 9", "Apple Watch Ultra 2", "Apple Watch SE Giá Rẻ", "Phụ Kiện Apple Watch"]
  },

  // AirPods pages
  airpods: {
    title: "AirPods Pro 2, AirPods 3 Chính Hãng | Giá Tốt Nhất 2024 | Trang Mobile",
    description: "🎧 AirPods Pro 2 USB-C từ 5.990.000đ 🎧 AirPods 3 từ 4.190.000đ 🎧 AirPods 2 từ 2.990.000đ. Bảo hành Apple 12 tháng, giao hàng 2H",
    keywords: ["airpods pro 2", "airpods 3", "airpods max", "tai nghe apple", "tai nghe bluetooth"],
    h1: "AirPods Chính Hãng - Tai Nghe Apple Cao Cấp",
    h2: ["AirPods Pro 2 USB-C", "AirPods 3 Lightning", "AirPods Max", "So Sánh AirPods"]
  },

  // Product specific
  productTemplate: (name: string, price: string) => ({
    title: `${name} Chính Hãng Giá Rẻ Nhất | Chỉ ${price}đ | Trang Mobile`,
    description: `⭐ Mua ${name} chính hãng Apple giá chỉ ${price}đ ⭐ Giảm thêm 1 triệu khi thanh toán online ⭐ Trả góp 0% ⭐ Đổi cũ lấy mới ⭐ Bảo hành 12 tháng`,
    h1: `${name} - Hàng Chính Hãng Apple Việt Nam`,
    content: `${name} chính hãng với mức giá ưu đãi nhất thị trường chỉ ${price}đ. 
    Sản phẩm được nhập khẩu chính thức từ Apple Việt Nam, bảo hành 12 tháng toàn quốc. 
    Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng, thanh toán online giảm thêm 500.000đ. 
    Giao hàng nhanh trong 2H nội thành TP.HCM, miễn phí toàn quốc cho đơn hàng từ 10 triệu.`
  }),

  // Category pages
  categories: {
    smartphone: {
      title: "Điện Thoại iPhone Chính Hãng | iPhone 15, 14, 13 Giá Rẻ | Trang Mobile",
      description: "📱 Điện thoại iPhone chính hãng từ 7.990.000đ. iPhone 15 Pro Max, iPhone 14, iPhone 13 giá tốt nhất. Trả góp 0%, bảo hành 12 tháng",
      h1: "Điện Thoại iPhone Chính Hãng"
    },
    tablet: {
      title: "Máy Tính Bảng iPad Chính Hãng | iPad Pro, Air, Mini | Trang Mobile",
      description: "📱 Máy tính bảng iPad chính hãng từ 8.990.000đ. iPad Pro M4, iPad Air, iPad Mini 6 giá tốt nhất. Trả góp 0%, giao hàng miễn phí",
      h1: "Máy Tính Bảng iPad Chính Hãng"
    },
    laptop: {
      title: "Laptop MacBook Chính Hãng | MacBook Air, Pro M3 | Trang Mobile",
      description: "💻 Laptop MacBook chính hãng từ 22.990.000đ. MacBook Air M3, MacBook Pro M3 Max giá tốt nhất. Tặng phụ kiện 2 triệu",
      h1: "Laptop MacBook Chính Hãng"
    }
  },

  // Common footer content for all pages
  footer: {
    trust: "✅ 100% Hàng Chính Hãng Apple ✅ Bảo Hành 12 Tháng ✅ Đổi Trả 30 Ngày ✅ Giao Hàng 2H",
    shipping: "🚚 Miễn phí giao hàng toàn quốc cho đơn từ 10 triệu 🚚 Giao nhanh 2H nội thành TP.HCM",
    payment: "💳 Thanh toán đa dạng: COD, Chuyển khoản, Thẻ tín dụng, Trả góp 0% lãi suất",
    support: "📞 Hotline: 0901234567 | 💬 Chat Zalo/Facebook 24/7 | 📧 Email: contact@trangmobile.com"
  }
};

// Helper function to generate rich snippet content
export function generateRichContent(productName: string, specs: any) {
  return {
    features: [
      `✓ ${productName} chính hãng 100% từ Apple Việt Nam`,
      `✓ Bảo hành chính hãng 12 tháng toàn quốc`,
      `✓ Hỗ trợ trả góp 0% lãi suất qua 20+ ngân hàng`,
      `✓ Đổi cũ lấy mới, thu cũ giá cao`,
      `✓ Tặng kèm phụ kiện chính hãng trị giá 1 triệu`,
      `✓ Giao hàng nhanh 2H nội thành TP.HCM`,
      `✓ Miễn phí giao hàng toàn quốc`
    ],
    specifications: specs,
    whyChooseUs: [
      "⭐ Uy tín hơn 5 năm trong ngành",
      "⭐ 50,000+ khách hàng tin tưởng",
      "⭐ Showroom trải nghiệm tại TP.HCM",
      "⭐ Đội ngũ tư vấn chuyên nghiệp",
      "⭐ Chính sách hậu mãi tốt nhất"
    ]
  };
}