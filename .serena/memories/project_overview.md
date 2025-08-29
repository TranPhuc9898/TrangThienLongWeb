# Trang Thiên Long Web - Project Overview

## Mục đích dự án
Đây là website thương mại điện tử "Trang Thiên Long Mobile" chuyên bán các sản phẩm Apple (iPhone, iPad, Mac) cho thị trường Việt Nam. Dự án được xây dựng với Next.js 14 và TypeScript.

## Tech Stack
- **Framework**: Next.js 14 với App Router
- **Language**: TypeScript với strict mode
- **Database**: SQLite với Prisma ORM
- **UI**: Tailwind CSS + ShadCN UI components
- **State Management**: Redux Toolkit + Redux Persist
- **Forms**: React Hook Form + Zod validation
- **3D**: Three.js với React Three Fiber
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Query**: TanStack Query

## Cấu trúc dự án
```
src/
├── app/                    # Next.js 14 App Router
│   ├── admin-admin/       # Admin dashboard
│   ├── api/               # API routes
│   ├── iphone/[series]/   # iPhone product pages
│   ├── shop/              # Product listings
│   └── thanh-toan/        # Checkout
├── components/            # UI components
├── lib/                   # Redux store, database, utils
├── types/                 # TypeScript definitions
└── constants/             # App constants including iPhone specs
```

## Database Schema
- Product với variants, colors, và region pricing
- Hỗ trợ nhiều storage options và color variants
- Admin authentication với JWT
- Banner management system

## Đặc điểm nổi bật
- 3D product viewer cho iPhone models
- Tích hợp Slack cho order notifications
- Vietnamese localization hoàn chỉnh
- Hỗ trợ địa chỉ Việt Nam (tỉnh/huyện/xã)
- Apple-inspired design system