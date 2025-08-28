import type { Context } from 'hono';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export const success = <T>(c: Context, data: T, status?: number) => {
  if (status) {
    return c.json<ApiResponse<T>>({ data } as ApiResponse<T>, status as any);
  }
  return c.json<ApiResponse<T>>({ data } as ApiResponse<T>);
};

export const created = <T>(c: Context, data: T) => {
  return c.json<ApiResponse<T>>({ data } as ApiResponse<T>, 201 as any);
};

export const error = (c: Context, error: string, status?: number) => {
  if (status) {
    return c.json<ApiResponse>({ error } as ApiResponse, status as any);
  }
  return c.json<ApiResponse>({ error } as ApiResponse, 500 as any);
};

export const badRequest = (c: Context, error: string) => {
  return c.json<ApiResponse>({ error } as ApiResponse, 400 as any);
};

export const notFound = (c: Context, error: string = 'Resource not found') => {
  return c.json<ApiResponse>({ error } as ApiResponse, 404 as any);
};

export const message = (c: Context, message: string, status?: number) => {
  if (status) {
    return c.json<ApiResponse>({ message } as ApiResponse, status as any);
  }
  return c.json<ApiResponse>({ message } as ApiResponse);
};