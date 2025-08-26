import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from './todo.controller'
import { createTodoSchema, updateTodoSchema, idParamSchema } from './todo.validation'

const todoRoutes = new Hono()
  .get('/', getAllTodos)
  .get(
    '/:id', 
    zValidator('param', idParamSchema),
    getTodoById
  )
  .post(
    '/', 
    zValidator('json', createTodoSchema),
    createTodo
  )
  .put(
    '/:id',
    zValidator('param', idParamSchema),
    zValidator('json', updateTodoSchema),
    updateTodo
  )
  .delete(
    '/:id',
    zValidator('param', idParamSchema),
    deleteTodo
  )

export default todoRoutes
export type TodoApiType = typeof todoRoutes