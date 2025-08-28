import { logger } from 'hono/logger';

export const loggerMiddleware = logger((_str, ..._rest) => {
  if (process.env.NODE_ENV !== 'test') {
  }
});
