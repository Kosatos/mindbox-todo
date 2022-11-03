import React from 'react'
import { useState } from 'react'
import styles from './App.module.css'

import { ITask } from './models'
import { viewType } from './models'

import AppTitle from './components/AppTitle'
import AppTodoForm from './components/AppTodoForm'
import AppTodoList from './components/AppTodoList'
import AppTodoControl from './components/AppTodoControl'

function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [view, setView] = useState<typeof viewType>('all')

  const addTaskHandler = (task: ITask) => {
    setTasks((prev) => [...prev, task])
  }
  const toggleCompleteHandler = (id: string) => {
    setTasks((prev: ITask[]) => [
      ...prev.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : { ...task }
      ),
    ])
  }
  const toggleViewHandler = (view: typeof viewType) => {
    setView(view)
  }
  const clearTasksHandler = () => {
    setTasks((prev) => [...prev.filter((task) => !task.complete)])
    setView('all')
  }

  const viewTasks = () => {
    switch (view) {
      case 'all':
        return tasks
      case 'active':
        return tasks.filter((task) => !task.complete)
      case 'completed':
        return tasks.filter((task) => task.complete)
    }
  }
  const tasksLeft = () => {
    return tasks.filter((task) => !task.complete).length
  }

  return (
    <div className={styles.app}>
      <header className={styles.app__header}>
        <AppTitle title='todos'></AppTitle>
      </header>

      <main className={styles.app__body}>
        <AppTodoForm onAdd={addTaskHandler}></AppTodoForm>

        {tasks.length !== 0 && (
          <div className={styles.app__todo}>
            <AppTodoList
              tasks={viewTasks()}
              onToggleComplete={toggleCompleteHandler}
            ></AppTodoList>
            <AppTodoControl
              view={view}
              left={tasksLeft()}
              onToggleView={toggleViewHandler}
              onClear={clearTasksHandler}
            ></AppTodoControl>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
