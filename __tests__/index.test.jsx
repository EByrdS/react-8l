/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import TodoListApp from '../pages/index'

describe("TodoListApp", () => {
 it("should render the heading", () => {
   const textToFind = "Hello World"

   render(<TodoListApp />);
   const heading = screen.getByText(textToFind);

   expect(heading).toBeInTheDocument();
 });
});
