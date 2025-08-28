import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
});

export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters')
    .optional(),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  completed: z.boolean().optional(),
});

export const idParamSchema = z.object({
  id: z.string().transform((val) => {
    const num = parseInt(val, 10);
    if (Number.isNaN(num) || num <= 0 || val !== num.toString()) {
      throw new Error('Invalid ID format');
    }
    return num;
  }),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
