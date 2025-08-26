import { Hono } from 'hono'
import { loggerMiddleware } from './shared/middleware/logger'
import { corsMiddleware } from './shared/middleware/cors'
import { errorHandler } from './shared/middleware/error-handler'
import todoRoutes from './features/todo/todo.routes'

const app = new Hono()

// Global middleware
app.use('*', errorHandler)
app.use('*', loggerMiddleware)
app.use('*', corsMiddleware)

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Feature routes
const apiRoutes = app.route('/api/todos', todoRoutes)

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404)
})

// Export the API routes type for Hono RPC
export type ApiRoutes = typeof apiRoutes
export type { TodoApiType } from './features/todo/todo.routes'

const PORT = process.env.PORT || 3001

// For Bun runtime
const server = {
  port: PORT,
  fetch: app.fetch,
}

export default server

console.log(`🚀 Server is running on port ${PORT}`)
console.log(`📋 Todo API available at http://localhost:${PORT}/api/todos`)
console.log(`❤️  Health check available at http://localhost:${PORT}/health`)