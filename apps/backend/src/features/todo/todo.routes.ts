import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from './todo.controller';
import {
  createTodoSchema,
  idParamSchema,
  updateTodoSchema,
} from './todo.validation';

const todoRoutes = new Hono()
  .get('/', getAllTodos)
  .get('/:id', zValidator('param', idParamSchema), getTodoById)
  .post('/', zValidator('json', createTodoSchema), createTodo)
  .put(
    '/:id',
    zValidator('param', idParamSchema),
    zValidator('json', updateTodoSchema),
    updateTodo
  )
  .delete('/:id', zValidator('param', idParamSchema), deleteTodo);

export default todoRoutes;
export type TodoApiType = typeof todoRoutes;
