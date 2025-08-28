'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api-client';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

type Todo = {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await api.todos.getAll();
      if (response.ok) {
        const result = await response.json();
        setTodos(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = async (title: string, description?: string) => {
    try {
      const response = await api.todos.create({ title, description });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setTodos([result.data, ...todos]);
        }
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      // 最新のデータを取得
      const getResponse = await api.todos.getById(id.toString());
      if (!getResponse.ok) {
        console.error('Failed to fetch todo for update');
        return;
      }

      const currentData = await getResponse.json();
      const currentTodo = currentData.data;

      if (!currentTodo) {
        console.error('Todo not found');
        return;
      }

      // 現在の値とマージ
      const apiUpdates = {
        title: updates.title ?? currentTodo.title,
        description:
          updates.description !== undefined
            ? updates.description === null
              ? undefined
              : updates.description
            : currentTodo.description,
        completed: updates.completed ?? currentTodo.completed,
      };

      const response = await api.todos.update(id.toString(), apiUpdates);

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setTodos(todos.map((todo) => (todo.id === id ? result.data : todo)));
        }
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await api.todos.delete(id.toString());

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <TodoForm onSubmit={addTodo} />
      </div>
      <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
    </div>
  );
}
