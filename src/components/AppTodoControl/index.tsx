import React from 'react'
import styles from './index.module.css'

import { viewType } from '../../models'

import AppTodoToggler from '../AppTodoToggler'

interface AppTodoControlProps {
  view: typeof viewType
  left: number
  onToggleView(view: typeof viewType): void
  onClear(): void
}

export default function AppTodoControl({
  view,
  left,
  onToggleView,
  onClear,
}: AppTodoControlProps) {
  return (
    <div className={styles.control}>
      <span>{left} items left</span>
      <div className={styles.control__togglers}>
        <AppTodoToggler
          value='all'
          isActive={view === 'all'}
          onToggleView={onToggleView}
        >
          All
        </AppTodoToggler>
        <AppTodoToggler
          value='active'
          isActive={view === 'active'}
          onToggleView={onToggleView}
        >
          Active
        </AppTodoToggler>
        <AppTodoToggler
          value='completed'
          isActive={view === 'completed'}
          onToggleView={onToggleView}
        >
          Completed
        </AppTodoToggler>
      </div>
      <button
        className={styles.control__clear}
        onClick={onClear}
        data-testid='clear-btn'
      >
        Clear completed
      </button>
    </div>
  )
}
