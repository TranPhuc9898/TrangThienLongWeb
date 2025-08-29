# Code Style & Conventions

## File Naming
- **Components**: PascalCase (`UserProfile.tsx`)
- **Files**: kebab-case (`user-profile.utils.ts`)
- **Constants**: UPPER_SNAKE_CASE (`IPHONE_SPECS_DATABASE`)

## TypeScript
- Strict mode enabled
- Interface over type for object shapes
- Explicit return types for functions
- Vietnamese text in product data and UI

## Component Structure
- ShadCN UI pattern in `components/ui/`
- Feature-based organization
- Redux hooks with type safety
- React Hook Form + Zod validation

## Database Conventions
- Prisma schema with explicit relations
- Cascade deletes for related data
- Vietnamese field names where appropriate
- CUID for primary keys

## Styling
- Tailwind CSS with custom Apple-inspired theme
- Mobile-first responsive design
- Custom fonts (Satoshi, Integral CF)
- Vietnamese color names in product data

## API Patterns
- Next.js API routes in `app/api/`
- JWT authentication for admin
- Slack integration for orders
- Vietnamese address API integration