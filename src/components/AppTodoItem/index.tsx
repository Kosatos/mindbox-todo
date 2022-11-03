import React from 'react'
import styles from './index.module.css'

import { ITask } from '../../models'

interface AppTodoItemProps {
  task: ITask
  onToggleComplete(id: string): void
}

export default function AppTodoItem({
  task,
  onToggleComplete,
}: AppTodoItemProps) {
  return (
    <li className={styles.task}>
      <div
        className={
          styles.task__action +
          (task.complete ? ` ${styles.task__action_completed}` : '')
        }
        onClick={() => onToggleComplete(task.id)}
        data-testid='toggle-active'
      ></div>
      <p
        className={
          styles.task__content +
          (task.complete ? ` ${styles.task__content_completed}` : '')
        }
      >
        {task.content}
      </p>
    </li>
  )
}
