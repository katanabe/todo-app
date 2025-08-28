# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Commands
- `bun run dev` - Start all development servers (frontend on :3000, backend on :3001)
- `bun run build` - Build all packages in parallel
- `bun run start` - Start production servers
- `bun run clean` - Clean build artifacts and stop processes

### Code Quality
- `bun run lint` - Run Biome linting on all apps
- `bun run lint:fix` - Fix linting issues automatically
- `bun run format:fix` - Format code automatically
- `bun run check:fix` - Run lint + format fixes together

### Database Operations
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema changes to database
- `docker-compose up -d mysql` - Start MySQL container
- `docker-compose down` - Stop MySQL container

### Individual Package Commands
- `bunx turbo run dev --filter=@todo-app/backend` - Run backend only
- `bunx turbo run dev --filter=@todo-app/frontend` - Run frontend only

## Architecture Overview

This is a Turborepo monorepo with two main applications:

### Backend (`apps/backend/`)
- **Framework**: Hono (lightweight web framework)
- **Runtime**: Bun with hot reload
- **Database**: Prisma ORM with MySQL (Docker)
- **Validation**: Zod schemas with @hono/zod-validator
- **Architecture**: Feature-based modules under `src/features/`

### Frontend (`apps/frontend/`)
- **Framework**: Next.js 15 with App Router and Turbopack
- **UI**: Tailwind CSS v4
- **API Client**: Hono RPC client with end-to-end type safety
- **Dependencies**: Imports backend types via workspace reference

### Key Architectural Patterns

#### Feature Module Structure
Each feature (e.g., `features/todo/`) follows this pattern:
- `*.controller.ts` - Request handlers
- `*.routes.ts` - Route definitions with validation
- `*.service.ts` - Business logic
- `*.validation.ts` - Zod schemas

#### Type Safety (Hono RPC)
- Backend exports `ApiRoutes` type from `src/index.ts`
- Frontend imports this type for `hc<ApiRoutes>()` client
- End-to-end type safety without shared packages
- API changes automatically propagate to frontend types

#### Shared Backend Modules
- `shared/database/` - Prisma connection
- `shared/middleware/` - CORS, error handling, logging
- `shared/utils/` - Response utilities

## Code Standards

### Biome Configuration
- **Linting**: Strict rules with frontend/backend overrides
- **Formatting**: Single quotes, semicolons, 2-space indentation
- **Import Organization**: Automatic with `organizeImports: "on"`
- Backend has stricter `any` type restrictions than frontend

### Database Schema
- Single `Todo` model in `apps/backend/prisma/schema.prisma`
- MySQL provider with connection via `DATABASE_URL`
- Auto-generated timestamps and incremental IDs

## Development Workflow

1. **Setup**: `bun install` (installs all workspace dependencies)
2. **Database**: Start MySQL with `docker-compose up -d mysql`, then `bun run db:generate && bun run db:push`
3. **Development**: `bun run dev` starts both frontend and backend concurrently
4. **Code Quality**: Run `bun run check:fix` before commits

## Environment Configuration

### Backend Environment (`.env`)
```
DATABASE_URL="mysql://todouser:todopass@localhost:3306/todoapp"
PORT=3001
```

### Docker Compose
- MySQL service with persistent volume
- Database: `todoapp`, User: `todouser/todopass`
- Port: 3306

## Testing

Currently no test framework is configured. Tests should be added following the project's package manager (Bun) and monorepo structure.