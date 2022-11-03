import React from 'react'

import { ITask } from '../../models'

import AppTodoItem from '../AppTodoItem'

interface AppTodoListProps {
  tasks: ITask[]
  onToggleComplete(id: string): void
}

export default function AppTodoList({
  tasks,
  onToggleComplete,
}: AppTodoListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <AppTodoItem
          task={task}
          onToggleComplete={onToggleComplete}
          key={task.id}
        ></AppTodoItem>
      ))}
    </ul>
  )
}
