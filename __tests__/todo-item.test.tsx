/**
 * @jest-environment jsdom
 */

// Testing tools imports
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Application imports
import TodoItem from '../components/todo-item'
import TodoItemInterface from '../types/interfaces'

const generalTodo: TodoItemInterface = {
  id: '1',
  isCompleted: false,
  text: 'Buy BTC'
};

const mockTodoBlur = jest.fn(x => x);
const mockTodoUpdate = jest.fn((e, id) => e);
const mockTodoRemove = jest.fn(x => x);
const mockTodoComplete = jest.fn(x => x);

describe('TodoItem', () => {
 beforeEach(() => {
   jest.clearAllMocks();
   generalTodo.isCompleted = false;
 });

 it('calls completion when user clicks on element', () => {
   const { container } = render(<TodoItem
     todo={generalTodo}
     handleTodoUpdate={mockTodoUpdate}
     handleTodoRemove={mockTodoRemove}
     handleTodoComplete={mockTodoComplete}
     handleTodoBlur={mockTodoBlur}
   />)

   userEvent.click(container.querySelector(".todo-item-unchecked"))
   expect(mockTodoComplete).toHaveBeenCalled();
 });

 it('calls update when user changes input', () => {
   const { getByDisplayValue } = render(<TodoItem
     todo={generalTodo}
     handleTodoUpdate={mockTodoUpdate}
     handleTodoRemove={mockTodoRemove}
     handleTodoComplete={mockTodoComplete}
     handleTodoBlur={mockTodoBlur}
   />)

   userEvent.type(getByDisplayValue(generalTodo.text), "Sell BTC")
   expect(mockTodoUpdate).toHaveBeenCalled();
 });

 it('has checked class if todo is completed', () => {
   generalTodo.isCompleted = true;
   const { container } = render(<TodoItem
     todo={generalTodo}
     handleTodoUpdate={mockTodoUpdate}
     handleTodoRemove={mockTodoRemove}
     handleTodoComplete={mockTodoComplete}
     handleTodoBlur={mockTodoBlur}
   />)

   expect(container.querySelector('.todo-item-unchecked')).not.toBeInTheDocument();
   expect(container.querySelector('.todo-item-checked')).toBeInTheDocument();
 });

 it('calls remove when user clicks on item-remove', () => {
   const { container } = render(<TodoItem
     todo={generalTodo}
     handleTodoUpdate={mockTodoUpdate}
     handleTodoRemove={mockTodoRemove}
     handleTodoComplete={mockTodoComplete}
     handleTodoBlur={mockTodoBlur}
   />);

   userEvent.click(container.querySelector(".item-remove"))
   expect(mockTodoRemove).toHaveBeenCalled();
 });

 it('calls blur when user looses focus from input', () => {
   const { container, getByDisplayValue } = render(<TodoItem
     todo={generalTodo}
     handleTodoUpdate={mockTodoUpdate}
     handleTodoRemove={mockTodoRemove}
     handleTodoComplete={mockTodoComplete}
     handleTodoBlur={mockTodoBlur}
   />);

   fireEvent.blur(getByDisplayValue(generalTodo.text));
   expect(mockTodoBlur).toHaveBeenCalled();
 });
});
