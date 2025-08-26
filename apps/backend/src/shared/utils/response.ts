import { Context } from 'hono'

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export const success = <T>(c: Context, data: T, status: number = 200) => {
  return c.json({ data } as ApiResponse<T>, status as any)
}

export const created = <T>(c: Context, data: T) => {
  return c.json({ data } as ApiResponse<T>, 201 as any)
}

export const error = (c: Context, error: string, status: number = 500) => {
  return c.json({ error } as ApiResponse, status as any)
}

export const badRequest = (c: Context, error: string) => {
  return c.json({ error } as ApiResponse, 400 as any)
}

export const notFound = (c: Context, error: string = 'Resource not found') => {
  return c.json({ error } as ApiResponse, 404 as any)
}

export const message = (c: Context, message: string, status: number = 200) => {
  return c.json({ message } as ApiResponse, status as any)
}