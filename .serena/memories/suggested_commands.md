# Suggested Commands

## Development Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Database Commands
- `npx prisma migrate dev` - Apply schema changes
- `npx prisma studio` - Open database browser
- `npx prisma db push` - Push schema to database
- `npx prisma generate` - Generate Prisma client

## System Commands (Darwin)
- `ls` - List directory contents
- `find` - Search for files
- `grep` - Search in files
- `git` - Version control
- `cd` - Change directory

## Key Development Workflows
1. **Product Management**: Use admin dashboard at `/admin-admin`
2. **3D Models**: Store GLB files in `public/models/`
3. **Environment**: Check `.env` for DATABASE_URL, SLACK_TOKEN, JWT_SECRET
4. **Testing**: Access localhost:3000 for development testing