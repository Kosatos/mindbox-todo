import React from 'react'
import styles from './index.module.css'

import { viewType } from '../../models'

interface AppTodoTogglerProps {
  children: React.ReactNode
  value: typeof viewType
  isActive: boolean
  onToggleView(view: typeof viewType): void
}

export default function AppTodoToggler({
  children,
  value,
  isActive,
  onToggleView,
}: AppTodoTogglerProps) {
  return (
    <button
      className={styles.toggler + (isActive ? ` ${styles.toggler_active}` : '')}
      onClick={() => onToggleView(value)}
      data-testid={`toggler-${value}`}
    >
      {children}
    </button>
  )
}
