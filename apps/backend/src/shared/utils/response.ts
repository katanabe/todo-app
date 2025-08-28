import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export const success = <T>(
  c: Context,
  data: T,
  status?: ContentfulStatusCode
) => c.json<ApiResponse<T>>({ data } as ApiResponse<T>, status);

export const created = <T>(c: Context, data: T) =>
  c.json<ApiResponse<T>>({ data } as ApiResponse<T>, 201);

export const error = (
  c: Context,
  error: string,
  status?: ContentfulStatusCode
) => c.json<ApiResponse>({ error } as ApiResponse, status);

export const badRequest = (c: Context, error: string) =>
  c.json<ApiResponse>({ error } as ApiResponse, 400);

export const notFound = (c: Context, error: string = 'Resource not found') =>
  c.json<ApiResponse>({ error } as ApiResponse, 404);

export const message = (
  c: Context,
  message: string,
  status?: ContentfulStatusCode
) => c.json<ApiResponse>({ message } as ApiResponse, status);
