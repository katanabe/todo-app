import { logger } from 'hono/logger'

export const loggerMiddleware = logger((str, ...rest) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(str, ...rest)
  }
})