/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import TodoListApp from '../pages/index'

describe("TodoListApp", () => {
 it("should render 8th Light", () => {
   const textToFind = "8th Light"

   render(<TodoListApp />);
   const heading = screen.getByText(textToFind);

   expect(heading).toBeInTheDocument();
 });
});
