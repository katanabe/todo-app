import { db } from '../../shared/database/connection'
import type { CreateTodoInput, UpdateTodoInput } from './todo.validation'
import type { Prisma } from '@prisma/client'

export const getAllTodos = async () => {
  return await db.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export const getTodoById = async (id: number) => {
  return await db.todo.findUnique({
    where: { id }
  })
}

export const createTodo = async (data: CreateTodoInput) => {
  return await db.todo.create({
    data: {
      title: data.title,
      description: data.description || null
    }
  })
}

export const updateTodo = async (id: number, input: UpdateTodoInput) => {  
  const data = {
    title: input.title,
    description: input.description || null,
    ...(input.completed !== undefined && { completed: input.completed })
  }
  
  return await db.todo.update({
    where: { id },
    data
  })
}

export const deleteTodo = async (id: number) => {
  return await db.todo.delete({
    where: { id }
  })
}