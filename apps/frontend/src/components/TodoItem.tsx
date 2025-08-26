'use client'

import { useState } from 'react'
type Todo = {
  id: number
  title: string
  description: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

interface TodoItemProps {
  todo: Todo
  onUpdate: (id: number, updates: Partial<Todo>) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed })
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return
    
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || null
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(todo.id)
    }
  }

  return (
    <div className={`p-4 hover:bg-gray-50 transition-colors ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggleComplete}
          className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={2}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="group">
              <div
                className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
                onClick={() => setIsEditing(true)}
              >
                {todo.title}
              </div>
              {todo.description && (
                <div
                  className={`mt-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}
                  onClick={() => setIsEditing(true)}
                >
                  {todo.description}
                </div>
              )}
              <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}