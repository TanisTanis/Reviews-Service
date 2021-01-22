import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReviewList from '../client/src/components/ReviewList';
import fakeData from './fakeData';

describe('Review List Component', () => {

  beforeEach(() => {
    render(<ReviewList reviews={fakeData} />)
  });

  test('Dynamically renders reviews based on props', () => {
    expect(screen.getByText('Tanis Kiel'));
    expect(screen.getByText('San Diego'));
    expect(screen.getByText('Donald Duck'));
  });

});