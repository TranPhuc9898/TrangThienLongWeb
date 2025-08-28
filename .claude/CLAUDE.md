# RULE 

# Claude Global Configuration

This file provides global instructions for Claude Code that apply to ALL projects. Project-specific CLAUDE.md files should read and inherit from this global config.

## 📁 Working Directory Behavior

**CRITICAL RULE**: ALWAYS use the directory where Claude Code was launched from, NOT the home directory.

**STARTUP ANNOUNCEMENT**: When Claude starts, ALWAYS display this message:
```
✓ Global config loaded from ~/.claude/global-config.md
✓ Working directory: [current directory path]  
✓ Ready to work in this project!
```

When Claude starts:
1. **Detect current working directory** using `pwd` command
2. **Stay in that project directory** throughout the session  
3. **Read project-specific CLAUDE.md** if it exists in current directory
4. **Apply both global config AND project config**
5. **Display startup announcement** showing current working directory

DO NOT default to home directory (~) unless the user explicitly navigates there.

## 🧠 Smart Mentor Workflow

When user submits any prompt, ALWAYS follow this workflow:

### PHASE 1: PHÂN TÍCH MỤC TIÊU LỚN
- Parse user requirement as senior React Native/NextJS/NestJS mentor
- Identify the core goal and scope of work
- Determine if it's new feature, bug fix, refactoring, or enhancement

### PHASE 2: XÁC ĐỊNH TECH STACK CẦN DÙNG
- **Frontend Options**: React Native / Next.js / NestJS
- **Backend Options**: NestJS / MongoDB / Redis
- **Tools Available**: Context7 docs / OpenMemory / SQLite todos / Filesystem / Git
- Match requirement with appropriate technology stack

### PHASE 3: CHUẨN BỊ RESOURCES
1. **Recall Memory**: Use `mcp__openmemory__recall_memory_abstract` to get context about similar past work
2. **Fetch Documentation**: Use `mcp__context7__resolve-library-id` and `mcp__context7__get-library-docs` for libraries needed
3. **Analyze Codebase**: Use Read/Grep/Glob tools to understand current project structure
4. **Check Dependencies**: Verify package.json and existing dependencies

### PHASE 4: TẠO EXECUTION PLAN
1. **Setup project structure** (if needed)
2. **Implement core logic** with best practices
3. **Integrate với existing codebase** following current patterns
4. **Test & validate** functionality
5. **Save progress** to memory using `mcp__openmemory__save_memory`

### PHASE 5: XÁC NHẬN VÀ THỰC HIỆN
- Present analysis and plan to user
- Ask: "Ổn để bắt đầu chịch không? (yes/no)"
- Only proceed with implementation after user confirms
- Use TodoWrite tool to track progress during implementation

## MCP Integration Rules

### Memory Management
- **Always recall** existing memory before starting new tasks
- **Save important decisions** and learnings to memory
- **Reference past solutions** when applicable

### Documentation Fetching
- **Proactively fetch docs** for libraries you plan to use
- **Verify API compatibility** with current project versions
- **Cache frequently used docs** in memory

### Code Analysis
- **Read existing code** before making changes
- **Follow current patterns** and conventions
- **Check for similar implementations** in codebase

## Vietnamese Development Context

### Language Support
- All prompts can be in Vietnamese or English
- Technical terms can be mixed (Vietnamese + English)
- Error messages and confirmations in Vietnamese preferred

### Tech Stack Specialization
- **React Native**: Mobile wallet apps, blockchain integration
- **Next.js**: E-commerce, landing pages, Vietnamese market
- **NestJS**: Backend APIs, messaging services, blockchain services

## Global Behavior Rules

1. **ALWAYS use TodoWrite** for multi-step tasks
2. **ALWAYS recall memory** before starting work
3. **ALWAYS fetch relevant docs** using Context7
4. **ALWAYS analyze existing code** before modifications
5. **ALWAYS ask confirmation** before major implementations
6. **ALWAYS save progress** to memory when done

## Error Handling

If any MCP server is unavailable:
- Continue with available tools
- Inform user about limited functionality
- Adapt workflow accordingly

---

**Note**: This global config is automatically inherited by all projects. Project-specific CLAUDE.md files can override or extend these behaviors.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Trang Thiên Long Mobile" - a Next.js 14 e-commerce application specialized in selling Apple products (iPhone, iPad, Mac, etc.) for the Vietnamese market. The project is built with TypeScript and follows modern React patterns.

## Development Commands

**Package Manager**: This project uses npm (package-lock.json is present)

- **Development server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production**: `npm run start`  
- **Lint**: `npm run lint`

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Database**: SQLite with Prisma ORM for product management
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
- **Authentication**: JWT with custom admin authentication

## Architecture

### File Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── admin-admin/       # Admin dashboard with auth
│   ├── api/               # API routes (auth, products, banners, sendOrder)
│   ├── iphone/[series]/   # iPhone product pages
│   ├── ipad/[series]/     # iPad product pages  
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
│   ├── admin/             # Admin components
│   └── threejs/           # 3D product viewer
├── lib/
│   ├── features/          # Redux slices (products, carts)
│   ├── hooks/             # Custom hooks including Redux hooks
│   ├── store.ts           # Redux store configuration
│   ├── database.ts        # Prisma database utilities
│   ├── auth.ts            # JWT authentication utilities
│   └── utils.ts           # Utility functions
├── contexts/              # React contexts (AdminEditContext)
├── types/                 # TypeScript type definitions
├── styles/                # Global styles and custom fonts
└── seo/                   # SEO components and metadata
```

### Key Architecture Patterns

- **Database Layer**: SQLite with Prisma ORM for product, variant, and banner management
- **Redux Persist**: Cart state is persisted to localStorage with whitelist configuration
- **SSR Storage**: Custom storage handler (`src/components/storage/`) for SSR compatibility with Redux Persist
- **Component Organization**: Features are grouped by page/functionality
- **TypeScript**: Strong typing throughout with custom types for products, cart items, etc.
- **Custom Hooks**: useVietnamLocations for address selection, Redux hooks for type safety
- **ShadCN Pattern**: UI components in `components/ui/` following ShadCN conventions
- **Provider Pattern**: Combined Redux + TanStack Query providers in `app/providers.tsx`
- **Admin System**: JWT-based authentication with admin dashboard for product/banner management

## State Management

### Redux Store Structure
- `products`: Product data management
- `carts`: Shopping cart with persistence (quantity, totals, discounts)

### Cart Operations
- Items identified by `id` + `attributes` array (for storage variants)
- Price calculations handle both percentage and fixed amount discounts
- Automatic persistence to localStorage

## Key Features

### Database & Product Management
- SQLite database with Prisma ORM (`prisma/schema.prisma`)
- Product model with variants, colors, and pricing tiers
- Admin dashboard for CRUD operations on products and banners
- Support for multiple storage options and color variants per product
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
- `DATABASE_URL`: SQLite database connection string (defaults to `file:./dev.db`)
- `SLACK_TOKEN`: Bearer token for Slack API integration (order notifications)
- `JWT_SECRET`: Secret key for JWT token generation (admin authentication)

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