# Todo App Monorepo - Project Overview

## Project Purpose
This is a Todo application built with a modern monorepo structure using Turborepo. It demonstrates full-stack TypeScript development with end-to-end type safety through Hono RPC.

## Tech Stack

### Monorepo Management
- **Turborepo** - Build system and task runner for monorepo
- **Bun** - JavaScript/TypeScript runtime and package manager
- **Workspaces** - Package management across apps

### Frontend (apps/frontend/)
- **Next.js 15** with App Router and Turbopack
- **React** - UI library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Hono RPC Client** - Type-safe API communication
- **TypeScript** - Static typing

### Backend (apps/backend/)
- **Bun** - Runtime with hot reload
- **Hono** - Lightweight web framework
- **Hono RPC** - End-to-end type safety
- **Zod** - Schema validation with @hono/zod-validator
- **Prisma** - ORM for database operations
- **MySQL** - Database (via Docker)
- **TypeScript** - Static typing

### Development Tools
- **Biome** - Fast linter and formatter (ESLint/Prettier replacement)
- **Docker Compose** - MySQL container management
- **Git** - Version control

## Architecture Patterns

### Feature-Based Structure
Each feature is organized in `apps/backend/src/features/` with:
- `*.controller.ts` - Request handlers
- `*.routes.ts` - Route definitions with validation  
- `*.service.ts` - Business logic
- `*.validation.ts` - Zod schemas

### End-to-End Type Safety
- Backend exports `ApiRoutes` type from `src/index.ts`
- Frontend imports this type for `hc<ApiRoutes>()` client
- No shared packages needed - types flow automatically

### Shared Modules
- `shared/database/` - Prisma connection
- `shared/middleware/` - CORS, error handling, logging
- `shared/utils/` - Response utilities