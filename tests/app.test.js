import React from 'react';

import { render, fireEvent, waitFor, screen, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../client/src/components/App';

describe('Main App Component', () => {

  beforeEach(() => {
    render(<App />);
  });

  test('Sorting Feature Displays All Sort Types', () => {
    fireEvent.click(screen.getByText('Most Recent'));
    expect(screen.getByText('Most Recent'));
    expect(screen.getByText('Most Helpful'));
    expect(screen.getByText('Highest To Lowest'));
    expect(screen.getByText('Lowest To Highest'));
    expect(screen.getByText('Oldest'));
  });

  test('Modal Displays on Button Click', () => {
    fireEvent.click(screen.getByText('Write a review'));
    expect(screen.getByText('My Review'));
  });

});