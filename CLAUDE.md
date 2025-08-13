# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Trang Thiên Long Mobile" - a Next.js 14 e-commerce application specialized in selling Apple products (iPhone, iPad, Mac, etc.) for the Vietnamese market. The project is built with TypeScript and follows modern React patterns.

## Development Commands

**Package Manager**: Prefer `yarn` over `npm` for this project (yarn.lock is present)

- **Development server**: `yarn dev` (runs on http://localhost:3000)
- **Build**: `yarn build`
- **Production**: `yarn start`  
- **Lint**: `yarn lint`

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom theme and ShadCN UI components
- **State Management**: Redux Toolkit with Redux Persist (cart persistence)
- **Forms**: React Hook Form with Zod validation
- **Animation**: Framer Motion
- **3D**: Three.js with React Three Fiber and Drei (3D product viewer)
- **UI Components**: ShadCN UI with Radix UI primitives
- **HTTP Client**: Axios
- **Icons**: Lucide React and React Icons
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Carousel**: Embla Carousel and Swiper for image galleries

## Architecture

### File Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/sendOrder/     # Slack integration API
│   ├── cart/              # Cart page
│   ├── shop/              # Product listing and detail pages
│   └── thanh-toan/        # Checkout page
├── components/
│   ├── ui/                # ShadCN UI components
│   ├── layout/            # Layout components (Navbar, Footer, Banner)
│   ├── homepage/          # Homepage specific components
│   ├── product-page/      # Product detail page components
│   ├── cart-page/         # Cart page components
│   ├── shop-page/         # Shop/listing page components
│   └── threejs/           # 3D product viewer
├── lib/
│   ├── features/          # Redux slices (products, carts)
│   ├── hooks/             # Custom hooks including Redux hooks
│   ├── store.ts           # Redux store configuration
│   └── utils.ts           # Utility functions
├── data/                  # Mock product data
├── types/                 # TypeScript type definitions
├── styles/                # Global styles and custom fonts
└── seo/                   # SEO components and metadata
```

### Key Architecture Patterns

- **Redux Persist**: Cart state is persisted to localStorage with whitelist configuration
- **SSR Storage**: Custom storage handler (`src/components/storage/`) for SSR compatibility with Redux Persist
- **Component Organization**: Features are grouped by page/functionality
- **TypeScript**: Strong typing throughout with custom types for products, cart items, etc.
- **Custom Hooks**: useVietnamLocations for address selection, Redux hooks for type safety
- **ShadCN Pattern**: UI components in `components/ui/` following ShadCN conventions
- **Provider Pattern**: Combined Redux + TanStack Query providers in `app/providers.tsx`

## State Management

### Redux Store Structure
- `products`: Product data management
- `carts`: Shopping cart with persistence (quantity, totals, discounts)

### Cart Operations
- Items identified by `id` + `attributes` array (for storage variants)
- Price calculations handle both percentage and fixed amount discounts
- Automatic persistence to localStorage

## Key Features

### Product Management
- Mock data in `src/data/index.ts` with iPhone-specific variants
- Product types support storages, discounts, ratings, reviews
- Category-based filtering (smartphones, tablets, etc.)

### 3D Product Viewer
- Three.js integration for iPhone 3D models
- Models stored in `public/models/` with GLB format (e.g., `public/models/iphone13/source/iPHONE.glb`)
- Interactive 3D viewing on product pages with OrbitControls
- Optimized loading with Suspense and loading spinners

### Order Integration
- Slack integration via `/api/sendOrder` endpoint
- Sends order details to `#thientranglong_buonban` channel
- Requires `SLACK_TOKEN` environment variable

### Responsive Design
- Mobile-first with custom breakpoints (`xs: 375px`)
- Custom font loading (Satoshi, Integral CF)
- Tailwind utilities with custom theme extensions

## Environment Setup

Required environment variables:
- `SLACK_TOKEN`: Bearer token for Slack API integration (order notifications)

External APIs used:
- `https://provinces.open-api.vn/api/?depth=3`: Vietnam administrative divisions data (provinces, districts, wards)

## Custom Styling

- **Fonts**: Custom fonts (Satoshi, Integral CF) loaded from `src/styles/fonts/`
- **Apple Design System**: Custom Apple-inspired color palette (`apple.blue`, `apple.gray`, `apple.dark`, `apple.light`)
- **Theme**: Extended Tailwind config with custom colors, spacing, and animations
- **Custom Animations**: `fade-in`, `slide-in`, `bounce-in` keyframes for enhanced UX
- **Components**: ShadCN UI components with Vietnamese text adaptations
- **Responsive Breakpoints**: Custom `xs: 375px` breakpoint for mobile-first design

## Vietnamese Localization

- Product names and descriptions in Vietnamese
- Address selection with provinces/districts/wards via `useVietnamLocations` hook
- Currency formatting in Vietnamese Dong (VND)
- Localized form validation messages
- Vietnamese checkout flow with proper address formatting
- Integration with Vietnamese open-source location API

## Important Configuration

### ShadCN UI Setup
- Configuration file: `components.json` with "new-york" style
- Base color: slate with CSS variables enabled
- Custom aliases configured for cleaner imports

### Next.js Configuration
- Image optimization enabled for `minhtuanmobile.com` domain
- App Router architecture with TypeScript support

### Product Data Structure
- Typed product interfaces in `src/types/product.types.ts`
- Support for multiple Apple product categories (iPhone, iPad, Mac, Watch, AirPods)
- Storage variants and pricing tiers per product
- Vietnamese color and feature descriptions

## Testing Strategy

No specific testing setup is configured. When adding tests, consider:
- Component testing for UI components
- Redux store testing for cart operations
- API route testing for Slack integration
- 3D model loading and Three.js component testing