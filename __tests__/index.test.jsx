/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import TodoListApp from '../pages/index'

describe("TodoListApp", () => {
 it("should render 8th Light", () => {
   render(<TodoListApp />);
   const heading = screen.getByText(/8th Light/);

   expect(heading).toBeInTheDocument();
 });
});
