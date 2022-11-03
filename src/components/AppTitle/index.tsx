import React from 'react'
import styles from './index.module.css'

interface AppHeaderProps {
  title: string
}

export default function AppTitle({ title }: AppHeaderProps) {
  return <h1 className={styles.title}>{title}</h1>
}

AppTitle.defaultProps = {
  title: 'App Title',
}
