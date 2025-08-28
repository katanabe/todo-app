# Codebase Structure

## Root Directory Structure
```
todo-app/
├── .serena/                 # Serena configuration
├── .claude/                 # Claude configuration  
├── .github/                 # GitHub workflows
├── apps/                    # Main applications
├── biome.jsonc             # Biome linter/formatter config
├── turbo.json              # Turborepo configuration
├── package.json            # Root package.json with workspace config
├── docker-compose.yml      # MySQL container setup
├── CLAUDE.md              # Development guidance for Claude
├── README.md              # Project documentation
└── .gitignore             # Git ignore patterns
```

## Backend Structure (apps/backend/)
```
apps/backend/
├── src/
│   ├── features/          # Feature-based modules
│   │   └── todo/         # Todo feature
│   │       ├── todo.controller.ts  # Request handlers
│   │       ├── todo.routes.ts      # Route definitions + validation
│   │       ├── todo.service.ts     # Business logic
│   │       └── todo.validation.ts  # Zod schemas
│   ├── shared/           # Shared utilities
│   │   ├── database/     # Prisma connection
│   │   ├── middleware/   # CORS, error handling, logging
│   │   └── utils/        # Response utilities
│   └── index.ts          # Main server + ApiRoutes export
├── prisma/
│   └── schema.prisma     # Database schema (MySQL)
├── .env                  # Environment variables
└── package.json          # Backend dependencies
```

## Frontend Structure (apps/frontend/)
```
apps/frontend/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── globals.css   # Global styles
│   │   └── favicon.ico   # Favicon
│   ├── components/       # React components
│   │   ├── TodoApp.tsx   # Main app component
│   │   ├── TodoList.tsx  # Todo list display
│   │   ├── TodoItem.tsx  # Individual todo item
│   │   └── TodoForm.tsx  # Todo creation form
│   └── lib/
│       └── api-client.ts # Hono RPC client setup
└── package.json          # Frontend dependencies
```

## Key Files and Their Roles

### Database Schema (apps/backend/prisma/schema.prisma)
- Single `Todo` model with fields: id, title, description, completed, createdAt, updatedAt
- MySQL provider with connection via `DATABASE_URL`

### API Type Export (apps/backend/src/index.ts) 
- Exports `ApiRoutes` type for frontend consumption
- Main Hono app configuration
- Health check endpoint

### Frontend API Client (apps/frontend/src/lib/api-client.ts)
- Imports `ApiRoutes` from backend
- Creates type-safe Hono RPC client
- Provides end-to-end type safety

### Feature Module Pattern
Each feature follows consistent structure:
- **Controller**: HTTP request/response handling
- **Routes**: Route definitions with Zod validation middleware
- **Service**: Business logic and database operations  
- **Validation**: Zod schemas for request/response validation