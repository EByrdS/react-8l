// Import dependencies
import * as React from 'react'

// Import components
import TodoForm from '../components/todo-form'
import TodoList from '../components/todo-list'

// Import interfaces
import { TodoInterface } from '../types/interfaces'

// Import styles
// import '../styles/styles.css'

// TodoListApp component
const TodoListApp = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([]) // DEBUG

  // Creating new todo item
  function handleTodoCreate(todo: TodoInterface) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Update new todos state
    newTodosState.push(todo)

    // Update todos state
    setTodos(newTodosState)
  }

  // Update existing todo item
  function handleTodoUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Find correct todo item to update
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.text = event.target?.value

    // Update todos state
    setTodos(newTodosState)
  }

  // Remove existing todo item
  function handleTodoRemove(id: string) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)

    // Update todos state
    setTodos(newTodosState)
  }

  // Check existing todo item as completed
  function handleTodoComplete(id: string) {
    // Copy current todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Find the correct todo item and update its 'isCompleted' key
    newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted =
      !newTodosState.find((todo: TodoInterface) => todo.id === id)!.isCompleted

    // Update todos state
    setTodos(newTodosState)
  }

  // Check if todo item has title
  function handleTodoBlur(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      event.target.classList.add('todo-input-error')
    } else {
      event.target.classList.remove('todo-input-error')
    }
  }

  return (
    <div className="todo-list-app">
    <h1>This is a project for 8th Light Ltd.</h1>
    <p>This project was built with love</p>
      {/* Todo form component */}
      <TodoForm
        handleTodoCreate={handleTodoCreate}
      />
      {/* Todo list component */}
      <TodoList
        todos={todos}
        handleTodoUpdate={handleTodoUpdate}
        handleTodoRemove={handleTodoRemove}
        handleTodoComplete={handleTodoComplete}
        handleTodoBlur={handleTodoBlur}
      />
    </div>
  )
}

export default TodoListApp
