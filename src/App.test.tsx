import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App component', () => {
  it('App renders', () => {
    render(<App />)

    // проверяем, что при рендере отображается только заголовок и форма (список с задачами не отображается, такак он пуст)
    expect(screen.getByText(/todos/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.queryByRole('list')).toBeNull()
  })

  it('adding tasks works correctly', () => {
    render(<App />)

    // добавляем задачи в список
    userEvent.type(screen.getByRole('textbox'), 'Тестовое задание{enter}')
    userEvent.type(screen.getByRole('textbox'), 'Прекрасный код{enter}')

    // проверяем отображение списка и его элементов
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument()
  })

  it('toggle task action add correct classes to task elements', () => {
    render(<App />)

    // добавляем задачу и делаем ее выполненной
    userEvent.type(screen.getByRole('textbox'), 'Тестовое задание{enter}')
    userEvent.click(screen.getByTestId('toggle-active'))

    // проверяем правильно ли добавляются классы при переходе задачи в статус "выполнено"
    expect(screen.getByTestId('toggle-active')).toHaveClass(
      'task__action_completed'
    )
    expect(screen.getByText('Тестовое задание')).toHaveClass(
      'task__content_completed'
    )
  })

  it('view togglers work correctly', () => {
    render(<App />)

    // добавляем задачи
    userEvent.type(screen.getByRole('textbox'), 'Тестовое задание{enter}')
    userEvent.type(screen.getByRole('textbox'), 'Прекрасный код{enter}')
    userEvent.type(screen.getByRole('textbox'), 'Покрытие тестами{enter}')

    // отмечаем выполненными первую и третью задачи
    const items = screen.getAllByTestId('toggle-active')
    userEvent.click(items[0])
    userEvent.click(items[2])

    // проверяем, что при нажатии на кнопку вызова активных задач, отображаются только активные задачи
    userEvent.click(screen.getByTestId('toggler-active'))
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument()
    expect(screen.queryByText('Тестовое задание')).toBeNull()
    expect(screen.queryByText('Покрытие тестами')).toBeNull()

    // проверяем, что при нажатии на кнопку вызова выполненных задач, отображаются только выполненные задачи
    userEvent.click(screen.getByTestId('toggler-completed'))
    expect(screen.queryByText('Прекрасный код')).toBeNull()
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument()

    // проверяем, что при нажатии на кнопку вызова всех задач, отображаются все задачи
    userEvent.click(screen.getByTestId('toggler-all'))
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument()
    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
    expect(screen.getByText('Покрытие тестами')).toBeInTheDocument()
  })

  it('clear tasks work correctly', () => {
    render(<App />)

    // добавляем задачи
    userEvent.type(screen.getByRole('textbox'), 'Тестовое задание{enter}')
    userEvent.type(screen.getByRole('textbox'), 'Прекрасный код{enter}')
    userEvent.type(screen.getByRole('textbox'), 'Покрытие тестами{enter}')

    // отмечаем выполненными первую и третью задачи
    const items = screen.getAllByTestId('toggle-active')
    userEvent.click(items[0])
    userEvent.click(items[2])

    // выполняем клик по кнопке очиски выполненных задач и показываем все оставшиеся задачи
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.click(screen.getByTestId('toggler-all'))

    // проверяем, что при нажатии на кнопку очистки выполненных задач, отображаются оставшиеся активные задачи
    expect(screen.getByText('Прекрасный код')).toBeInTheDocument()
    expect(screen.queryByText('Тестовое задание')).toBeNull()
    expect(screen.queryByText('Покрытие тестами')).toBeNull()
  })
})
