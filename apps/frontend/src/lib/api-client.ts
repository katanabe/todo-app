import { hc } from 'hono/client'
import type { ApiRoutes } from '@todo-app/backend'

const client = hc<ApiRoutes>('http://localhost:3001/')

export const api = {
  todos: {
    getAll: () => client.api.todos.$get(),
    getById: (id: string) => client.api.todos[':id'].$get({ param: { id } }),
    create: (data: { title: string; description?: string }) => 
      client.api.todos.$post({ json: data }),
    // TODO: Fix type definition for PUT endpoint with json body
    update: (id: string, data: { title?: string; description?: string; completed?: boolean }) => 
      client.api.todos[':id'].$put({ 
        param: { id },
        json: data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
    delete: (id: string) => 
      client.api.todos[':id'].$delete({ param: { id } }),
  }
}