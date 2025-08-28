# Code Style and Conventions

## Biome Configuration (biome.jsonc)

### Formatting Standards
- **Quote Style**: Single quotes (`'`) for JavaScript/TypeScript
- **Semicolons**: Always required
- **Indentation**: 2 spaces (not tabs)
- **Line Width**: 80 characters
- **Line Ending**: LF (Unix style)
- **Trailing Commas**: ES5 compatible
- **Arrow Function Parentheses**: Always required `(param) => ...`

### Import Organization
- **Auto-organize imports**: Enabled (`organizeImports: "on"`)
- Imports are automatically sorted and organized on save

### Linting Rules

#### Global Rules
- **Recommended rules**: Enabled by default
- **Unused variables/imports**: Error
- **Console statements**: Allowed in development
- **any type**: Warning globally
- **Non-null assertions**: Warning
- **Const usage**: Required where possible
- **Template literals**: Required over string concatenation

#### Frontend-Specific Rules (apps/frontend/)
- **Accessibility**: SVG title elements not required
- **Button type**: Warning for missing type attribute
- **any type**: Warning (more lenient than backend)

#### Backend-Specific Rules (apps/backend/)
- **any type**: Error (stricter than frontend)
- More strict type checking overall

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (e.g., `TodoItem.tsx`)
- **Services/Utils**: camelCase with descriptive names
- **Routes/Controllers**: Feature name + type (e.g., `todo.controller.ts`)
- **Validation**: Feature name + `.validation.ts`

### Code Structure
- **Feature modules**: Organized under `src/features/`
- **Shared code**: Under `src/shared/`
- **Each feature**: controller, routes, service, validation files

## TypeScript Standards
- Strict type checking enabled
- End-to-end type safety through Hono RPC
- Zod schemas for runtime validation
- No `any` types in backend (error level)
- Minimal `any` usage in frontend (warning level)

## Git Integration
- Biome integrates with git for file tracking
- Uses `.gitignore` for file exclusions
- Pre-commit formatting and linting recommended