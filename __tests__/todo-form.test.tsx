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

jest.mock('shortid');
const mockTodoCreate = jest.fn(x => x);

describe('TodoForm', () => {
  it('calls handleTodoCreate', () => {
    const mockedId = 'MockedShortId-123'
    shortid.generate.mockImplementation(() => mockedId);

    const { form } = render(<TodoForm
      handleTodoCreate={mockTodoCreate}
    />);

    userEvent.type(screen.queryByPlaceholderText('Enter new todo'),
                   'Buy milk{enter}');

    expect(mockTodoCreate).toHaveBeenCalled();
    expect(mockTodoCreate.mock.results[0].value).toMatchObject(
      {
        id: mockedId,
        isCompleted: false,
        text: 'Buy milk'
      }
    );
  });
});
