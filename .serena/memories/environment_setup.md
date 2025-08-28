# Environment Setup and Configuration

## System Information
- **Platform**: Darwin (macOS)
- **Package Manager**: Bun (located at ~/.asdf/shims/bun)
- **Git**: Available at /opt/homebrew/bin/git
- **Node Version**: >= 18 (specified in package.json engines)

## Environment Variables

### Backend (.env in apps/backend/)
```
DATABASE_URL="mysql://todouser:todopass@localhost:3306/todoapp"
PORT=3001
```

## Docker Configuration (docker-compose.yml)
- **MySQL Service**: 
  - Database: `todoapp`
  - User: `todouser` 
  - Password: `todopass`
  - Port: 3306
  - Persistent volume for data storage

## Development Ports
- **Frontend**: http://localhost:3000 (Next.js)
- **Backend**: http://localhost:3001 (Hono API)
- **Database**: localhost:3306 (MySQL)

## Package Manager Configuration
- **Bun version**: 1.2.19 (specified in packageManager field)
- **Workspaces**: Configured for apps/* pattern
- **Turbo**: Version 2.5.6 for monorepo task running

## Initial Setup Steps
1. Clone repository
2. Run `bun install` to install all dependencies
3. Start MySQL: `docker-compose up -d mysql`  
4. Generate Prisma client: `bun run db:generate`
5. Push schema to DB: `bun run db:push`
6. Start development: `bun run dev`

## Development Server Startup
The `bun run dev` command:
- Kills any existing processes (next dev, bun run --hot)
- Starts all services in parallel via Turborepo
- Frontend runs on port 3000 with Turbopack
- Backend runs on port 3001 with Bun hot reload

## Build Configuration
- **Turbo**: Parallel builds across all packages
- **Next.js**: Production builds with optimization
- **TypeScript**: Strict type checking enabled
- **Biome**: Code quality checks during build process