# Task Completion Checklist

## Before Completing Any Task

### 1. Code Quality Checks (REQUIRED)
Always run before considering a task complete:
```bash
bun run check:fix
```
This command runs both linting and formatting fixes automatically.

### 2. Individual Quality Checks (if needed)
If you want to run specific checks:
```bash
bun run lint          # Check for linting issues
bun run lint:fix      # Fix linting issues
bun run format        # Check formatting
bun run format:fix    # Fix formatting
```

### 3. Database Changes
If database schema was modified:
```bash
bun run db:generate   # Regenerate Prisma client
bun run db:push       # Push changes to database
```

### 4. Build Verification
Ensure the project builds successfully:
```bash
bun run build        # Build all packages
```

### 5. Development Server Test
Verify development servers start correctly:
```bash
bun run dev          # Start all development servers
# Test that both frontend (3000) and backend (3001) are accessible
```

## Testing (Currently Not Configured)
- No test framework is currently set up
- Tests should be added following Bun and monorepo structure
- Consider adding unit tests for services and integration tests for APIs

## Git Workflow
- Ensure all changes are committed with meaningful messages
- Follow conventional commit format if established
- Push to appropriate branch

## Documentation Updates
- Update README.md if new features or significant changes
- Update CLAUDE.md if development workflow changes
- Add JSDoc comments for complex functions if needed

## Type Safety Verification
- Ensure no TypeScript errors in both frontend and backend
- Verify Hono RPC types are properly exported and imported
- Check Zod validation schemas are correctly implemented