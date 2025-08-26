import { Context } from 'hono'
import * as todoService from './todo.service'
import { success, created, error, notFound, message } from '../../shared/utils/response'
import { CreateTodoInput, UpdateTodoInput, IdParam } from './todo.validation'

export const getAllTodos = async (c: Context) => {
  try {
    const todos = await todoService.getAllTodos()
    return success(c, todos)
  } catch (err) {
    console.error('Error fetching todos:', err)
    return error(c, 'Failed to fetch todos')
  }
}

export const getTodoById = async (
  c: Context<any, '/:id', { out: { param: IdParam } }>
) => {
  try {
    const { id }: IdParam = c.req.valid('param')
    
    const todo = await todoService.getTodoById(id)
    if (!todo) {
      return notFound(c, 'Todo not found')
    }

    return success(c, todo)
  } catch (err) {
    console.error('Error fetching todo:', err)
    return error(c, 'Failed to fetch todo')
  }
}

export const createTodo = async (
  c: Context<any, '/', { out: { json: CreateTodoInput } }>
) => {
  try {
    const validatedData: CreateTodoInput = c.req.valid('json')
    
    const todo = await todoService.createTodo(validatedData)
    return created(c, todo)
  } catch (err) {
    console.error('Error creating todo:', err)
    return error(c, 'Failed to create todo')
  }
}

export const updateTodo = async (
  c: Context<any, '/:id', { out: { param: IdParam; json: UpdateTodoInput } }>
) => {
  try {
    const { id }: IdParam = c.req.valid('param')
    const validatedData: UpdateTodoInput = c.req.valid('json')

    const todo = await todoService.updateTodo(id, validatedData)
    return success(c, todo)
  } catch (err) {
    console.error('Error updating todo:', err)
    if (err instanceof Error && err.message.includes('Record to update not found')) {
      return notFound(c, 'Todo not found')
    }
    return error(c, 'Failed to update todo')
  }
}

export const deleteTodo = async (
  c: Context<any, '/:id', { out: { param: IdParam } }>
) => {
  try {
    const { id }: IdParam = c.req.valid('param')

    await todoService.deleteTodo(id)
    return message(c, 'Todo deleted successfully')
  } catch (err) {
    console.error('Error deleting todo:', err)
    if (err instanceof Error && err.message.includes('Record to delete does not exist')) {
      return notFound(c, 'Todo not found')
    }
    return error(c, 'Failed to delete todo')
  }
}