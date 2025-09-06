# DEAL HOT HÔM NAY - Complete Documentation

## 📋 Overview
Trang Deal Hot Hôm Nay - Trang hiển thị các sản phẩm Apple đang có khuyến mãi hot với giá shock

**URL:** `/deal-hot-hom-nay`  
**File Location:** `src/app/deal-hot-hom-nay/page.tsx`

## 🎨 Complete CSS Styles

### Tailwind Classes Used

#### Header Section
```css
/* Container */
.min-h-screen.bg-gray-50

/* Header Gradient Background */
.bg-gradient-to-r.from-red-500.to-pink-600.text-white.py-12

/* Header Content Container */
.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8

/* Title Section */
.text-center
.flex.items-center.justify-center.mb-4
.text-3xl.md:text-4xl.font-bold

/* Icons */
.w-8.h-8.mr-3 /* Flame icon left */
.w-8.h-8.ml-3 /* Flame icon right */

/* Subtitle */
.text-lg.opacity-90

/* Update Time */
.mt-6.flex.items-center.justify-center.space-x-2.text-sm
.w-4.h-4 /* Clock icon */
```

#### Product Grid
```css
/* Main Container */
.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8.py-12

/* Grid Layout */
.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.gap-8

/* Product Card */
.bg-white.rounded-xl.shadow-lg.overflow-hidden
.hover:shadow-xl.transition-all.duration-300.hover:-translate-y-2
.animate-slideInUp /* Animation với delay tính theo index * 0.1s */

/* Badges */
.absolute.top-3.left-3.bg-red-500.text-white.text-xs.font-bold.px-2.py-1.rounded.z-10.animate-bounce
.absolute.top-3.right-3.bg-black/70.text-white.text-xs.px-2.py-1.rounded

/* Product Image */
.w-full.h-64.object-contain.bg-gray-50

/* Timer Badge */
.absolute.bottom-3.right-3.bg-white/90.backdrop-blur.text-xs.px-2.py-1.rounded.flex.items-center
.w-3.h-3.mr-1.text-red-500 /* Clock icon in timer */

/* Content Section */
.p-6

/* Category & Rating */
.flex.items-center.justify-between.mb-2
.text-xs.bg-blue-100.text-blue-700.px-2.py-1.rounded-full
.flex.items-center
.w-4.h-4.text-yellow-400.fill-current /* Star icon */
.text-sm.text-gray-600.ml-1

/* Product Title */
.font-semibold.text-lg.text-gray-900.mb-3.line-clamp-2

/* Price Section */
.flex.items-center.space-x-2.mb-4
.text-2xl.font-bold.text-red-600 /* Sale price */
.text-sm.text-gray-400.line-through /* Original price */

/* Stats Section */
.flex.items-center.justify-between.mb-4
.flex.items-center.text-sm.text-gray-600
.w-4.h-4.mr-1 /* Tag icon */
.text-sm.text-red-600.font-medium

/* Buy Button */
.w-full.bg-gradient-to-r.from-red-500.to-pink-600.text-white.py-3.rounded-lg.font-semibold
.hover:from-red-600.hover:to-pink-700.transition-all.duration-200.transform.hover:scale-105
```

#### CTA Section
```css
/* Container */
.mt-16.text-center.bg-white.rounded-2xl.p-8.shadow-lg

/* Heading */
.text-2xl.font-bold.text-gray-900.mb-4

/* Description */
.text-gray-600.mb-6

/* Button Container */
.flex.flex-col.sm:flex-row.gap-4.justify-center

/* Primary Button */
.bg-gray-900.text-white.px-8.py-3.rounded-full.font-semibold.hover:bg-black.transition-colors

/* Secondary Button */
.border.border-gray-300.text-gray-700.px-8.py-3.rounded-full.font-semibold.hover:bg-gray-50.transition-colors
```

## 📊 Complete Product Data

```javascript
const allHotDeals = [
  {
    id: 1,
    title: "iPhone 15 Pro Max 256GB",
    originalPrice: 29990000,
    salePrice: 26990000,
    discount: 10,
    image: "/images/iphone14.png",
    badge: "Giảm 3 triệu",
    rating: 4.8,
    sold: 234,
    timeLeft: "2 ngày 14 giờ",
    category: "iPhone",
  },
  {
    id: 2,
    title: "iPad Air M2 256GB WiFi",
    originalPrice: 18990000,
    salePrice: 16990000,
    discount: 11,
    image: "/images/iphone14.png",
    badge: "Mới ra mắt",
    rating: 4.9,
    sold: 156,
    timeLeft: "1 ngày 8 giờ",
    category: "iPad",
  },
  {
    id: 3,
    title: "Apple Watch Series 9 45mm",
    originalPrice: 8990000,
    salePrice: 7990000,
    discount: 11,
    image: "/images/iphone14.png",
    badge: "Bán chạy",
    rating: 4.7,
    sold: 189,
    timeLeft: "3 ngày 2 giờ",
    category: "Apple Watch",
  },
  {
    id: 4,
    title: 'MacBook Air M2 13" 256GB',
    originalPrice: 25990000,
    salePrice: 22990000,
    discount: 12,
    image: "/images/iphone14.png",
    badge: "Siêu hot",
    rating: 4.9,
    sold: 87,
    timeLeft: "5 ngày 10 giờ",
    category: "MacBook",
  },
  {
    id: 5,
    title: "AirPods Pro 2nd Gen",
    originalPrice: 6490000,
    salePrice: 5490000,
    discount: 15,
    image: "/images/iphone14.png",
    badge: "Giá sốc",
    rating: 4.8,
    sold: 312,
    timeLeft: "1 ngày 4 giờ",
    category: "AirPods",
  },
  {
    id: 6,
    title: "iPhone 14 Pro 128GB",
    originalPrice: 24990000,
    salePrice: 21990000,
    discount: 12,
    image: "/images/iphone13.png",
    badge: "Hết hàng sớm",
    rating: 4.7,
    sold: 445,
    timeLeft: "6 giờ 23 phút",
    category: "iPhone",
  },
];
```

## 🎯 Key Features

### 1. Visual Elements
- **Gradient Header:** Red to Pink gradient background
- **Flame Icons:** Animated flame icons on both sides of title
- **Discount Badges:** Multiple badge types (Giảm X triệu, Mới ra mắt, Bán chạy, etc.)
- **Countdown Timer:** Shows time remaining for each deal
- **Rating System:** Star rating with numerical value
- **Sales Counter:** Shows number of items sold

### 2. Responsive Design
- **Mobile:** Single column layout
- **Tablet:** 2 columns (md:grid-cols-2)
- **Desktop:** 3 columns (lg:grid-cols-3)

### 3. Animations
- **Card Animation:** `animate-slideInUp` with staggered delay
- **Badge Animation:** `animate-bounce` for hot deal badges
- **Hover Effects:** 
  - Card lifts up: `hover:-translate-y-2`
  - Shadow increases: `hover:shadow-xl`
  - Button scale: `hover:scale-105`

### 4. Color Scheme
```css
/* Primary Colors */
Red: #ef4444 (red-500)
Pink: #ec4899 (pink-600)
Gray: #f9fafb (gray-50)
White: #ffffff

/* Text Colors */
Primary: #111827 (gray-900)
Secondary: #4b5563 (gray-600)
Muted: #9ca3af (gray-400)

/* Accent Colors */
Blue: #3b82f6 (blue-700 in category badge)
Yellow: #facc15 (yellow-400 for star rating)
Black: #000000 (for discount percentage)
```

## 🔧 Component Structure

```tsx
<div className="min-h-screen bg-gray-50">
  {/* Header Section */}
  <div className="bg-gradient-to-r from-red-500 to-pink-600">
    <Title />
    <Subtitle />
    <UpdateTime />
  </div>

  {/* Product Grid */}
  <div className="grid">
    {allHotDeals.map(deal => (
      <ProductCard key={deal.id}>
        <ProductImage />
        <Badges />
        <Timer />
        <ProductInfo />
        <PriceSection />
        <Stats />
        <BuyButton />
      </ProductCard>
    ))}
  </div>

  {/* CTA Section */}
  <div className="cta-section">
    <CTATitle />
    <CTADescription />
    <CTAButtons />
  </div>
</div>
```

## 📱 Mobile Optimizations
- Responsive padding: `px-4 sm:px-6 lg:px-8`
- Flexible grid system
- Touch-friendly button sizes (py-3)
- Readable font sizes on mobile
- Stacked buttons on mobile (flex-col sm:flex-row)

## ⚡ Performance Considerations
1. **Images:** Currently using placeholder images, should be optimized
2. **Animations:** Staggered delays prevent all cards animating at once
3. **Lazy Loading:** Could benefit from implementing lazy load for images
4. **Static Data:** Currently hardcoded, should connect to API/database

## 🚀 Potential Improvements
1. **Dynamic Data:** Connect to product database
2. **Real Images:** Replace placeholder images with actual product photos
3. **Functional Timer:** Implement real countdown functionality
4. **Add to Cart:** Integrate with cart system
5. **Filters:** Add category/price filters
6. **Pagination:** For handling more products
7. **Search:** Add search functionality
8. **Wishlist:** Add to wishlist feature
9. **Share:** Social media sharing buttons
10. **SEO:** Add meta tags and structured data

## 📦 Dependencies
- React
- Lucide React (for icons: Flame, Clock, Tag, Star)
- Tailwind CSS (for styling)
- Next.js (framework)

## 🔗 Related Components
- RelatedProducts component links to this page
- Newsletter section mentions "Deal flash"
- PriceComparison component has similar "Best Deals" section

## 📝 Notes
- Update time shows "Hôm nay, 09:00 AM" (static)
- All products currently use same placeholder images
- Prices are in Vietnamese Dong (VND)
- Text is in Vietnamese language
- Component is fully self-contained with no external API calls