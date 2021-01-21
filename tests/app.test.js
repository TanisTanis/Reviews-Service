import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../client/src/components/App';

// describe("Main App Component", () => {

//   beforeEach(() => {
//     render(<App />);
//   })

//   test('div reads correctly', () => {
//     expect(screen.getByText('Hello World With React!'));
//   });

//   test('changes view based on state', () => {
//     const text = screen.queryByText('You suck!');
//     expect(text).not.toBeInTheDocument();
//     fireEvent.click(screen.getByText('Change'));
//     expect(screen.getByText('You suck!'));
//   });
// })

describe("Sorting Feature", () => {

  beforeEach(() => {
    render(<App />);
  })

  test('Clicking sorting selction shows all sorting types', () => {

    waitFor(() => expect(componentDidMount).toHaveBeenCalledTimes(1))
      .then(() => {
        fireEvent.click(screen.getByText('Most Recent'));
        expect(screen.getByText('Oldest'));
        expect(screen.getByText('Most Recent'));
        expect(screen.getByText('Most Helpful'));
        expect(screen.getByText('Lowest To Highest'));
        expect(screen.getByText('Highest To Lowest'));
      })
  });
})


