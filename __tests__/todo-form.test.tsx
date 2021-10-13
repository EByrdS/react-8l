/**
 * @jest-environment jsdom
 */

// Testing tools imports
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Application imports
import TodoForm from '../components/todo-form'
// Mocking imports
import shortid from 'shortid'

// Mock shortid
jest.mock('shortid');
const mockedId = 'MockedShortId-123'
shortid.generate.mockImplementation(() => mockedId)
// Mock the function than handles the generated Todo
const mockTodoCreate = jest.fn(x => x);

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // the mockTodoCreate needs to be reset
  });

  it('calls handleTodoCreate', () => {
    const { container, queryByPlaceholderText } = render(<TodoForm
      handleTodoCreate={mockTodoCreate}
    />);

    userEvent.type(queryByPlaceholderText('Enter new todo'),
                   'Buy milk{enter}');

    expect(mockTodoCreate).toHaveBeenCalled();
    expect(mockTodoCreate.mock.results[0].value).toMatchObject(
      {
        id: 'MockedShortId-123',
        isCompleted: false,
        text: 'Buy milk'
      }
    );
  });

  it('does not call handleTodoCreate with empty input', () => {
    const { container, queryByPlaceholderText } = render(<TodoForm
      handleTodoCreate={mockTodoCreate}
    />);

    userEvent.type(queryByPlaceholderText('Enter new todo'),
                   '{enter}');

    expect(mockTodoCreate).not.toHaveBeenCalled();
  });
});
