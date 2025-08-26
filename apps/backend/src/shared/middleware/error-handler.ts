import { Context, Next } from 'hono'
import { error } from '../utils/response'

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (err) {
    console.error('Unhandled error:', err)
    
    if (err instanceof Error) {
      // Database errors
      if (err.message.includes('Unique constraint failed')) {
        return error(c, 'Resource already exists', 409)
      }
      
      if (err.message.includes('Foreign key constraint failed')) {
        return error(c, 'Invalid reference', 400)
      }
      
      // Generic error response
      return error(c, 'Internal server error', 500)
    }
    
    return error(c, 'An unexpected error occurred', 500)
  }
}