'use client'

type Todo = {
  id: number
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: number, updates: Partial<Todo>) => void
  onDelete: (id: number) => void
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="text-lg font-medium">No tasks yet</div>
        <div className="text-sm">Add a task above to get started</div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}