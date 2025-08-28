# Suggested Development Commands

## Primary Development Commands
- `bun install` - Install all workspace dependencies
- `bun run dev` - Start all development servers (frontend:3000, backend:3001)
- `bun run build` - Build all packages in parallel
- `bun run start` - Start production servers
- `bun run clean` - Clean build artifacts and stop processes

## Code Quality Commands
- `bun run lint` - Run Biome linting on all apps
- `bun run lint:fix` - Fix linting issues automatically
- `bun run format` - Check code formatting
- `bun run format:fix` - Format code automatically
- `bun run check` - Run lint + format checks together
- `bun run check:fix` - Run lint + format fixes together (recommended before commits)

## Database Commands
- `docker-compose up -d mysql` - Start MySQL container
- `docker-compose down` - Stop MySQL container
- `docker-compose down -v` - Stop MySQL container and remove data
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema changes to database

## Individual Package Commands
- `bunx turbo run dev --filter=@todo-app/backend` - Run backend only
- `bunx turbo run dev --filter=@todo-app/frontend` - Run frontend only
- `bunx turbo run build --filter=@todo-app/backend` - Build backend only
- `bunx turbo run build --filter=@todo-app/frontend` - Build frontend only

## System Commands (Darwin)
- `git` - Version control (located at /opt/homebrew/bin/git)
- `bun` - Runtime and package manager (located at ~/.asdf/shims/bun)
- `ls` - List directory contents
- `cd` - Change directory
- `grep` - Search text patterns
- `find` - Find files and directories
- `pkill` - Kill processes by name
- `docker-compose` - Container management

## Development Workflow
1. `bun install` - Initial setup
2. `docker-compose up -d mysql` - Start database
3. `bun run db:generate && bun run db:push` - Setup database schema
4. `bun run dev` - Start development servers
5. `bun run check:fix` - Before commits (lint + format)