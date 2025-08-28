import type { ApiRoutes } from '@todo-app/backend';
import { hc } from 'hono/client';

const client = hc<ApiRoutes>('http://localhost:3001/');

export const api = {
  todos: {
    getAll: () => client.api.todos.$get(),
    getById: (id: string) => client.api.todos[':id'].$get({ param: { id } }),
    create: (data: { title: string; description?: string }) =>
      client.api.todos.$post({ json: data }),
    update: (
      id: string,
      data: { title: string; description?: string; completed?: boolean }
    ) => {
      // Hono RPC の型定義の問題を回避するため、リクエストを直接作成
      const url = client.api.todos[':id'].$url({ param: { id } });
      return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    delete: (id: string) => client.api.todos[':id'].$delete({ param: { id } }),
  },
};
