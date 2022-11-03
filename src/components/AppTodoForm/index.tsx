import React from 'react'
import { useState } from 'react'
import shortid from 'shortid'
import styles from './index.module.css'

import { ITask } from '../../models'

interface AppTodoFormProps {
  onAdd(task: ITask): void
}

export default function AppTodoForm({ onAdd }: AppTodoFormProps) {
  const [value, setValue] = useState<string>('')

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }
  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    onAdd({ id: shortid.generate(), content: value, complete: false })
    setValue('')
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        className={styles.form__input}
        type='text'
        value={value}
        placeholder='What needs to be done?'
        onChange={changeHandler}
      />
    </form>
  )
}
