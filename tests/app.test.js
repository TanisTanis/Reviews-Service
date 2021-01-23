import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import App from '../client/src/components/App';
import fakeData from './fakeData';
jest.mock('axios');

describe('Main App Component', () => {

  beforeEach(async () => {
    try {
      axios.get.mockResolvedValue({
        data: {
          reviews: fakeData.reviews,
          ratings: fakeData.ratings,
          ratingsCount: fakeData.ratingsCount,
        },
      });
      await render(<App />);
    } catch (err) {
      console.log(err);
    }
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