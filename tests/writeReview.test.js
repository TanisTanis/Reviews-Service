import React from 'react';

import { render, fireEvent, waitFor, screen, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import WriteReview from '../client/src/components/WriteReview';
import fakeData from './fakeData';

describe('Write Review Modal', () => {

  beforeEach(() => {
    render(<WriteReview />);
  });


  test('Review Stars Functionality', () => {
    fireEvent.mouseOver(document.getElementById('5'));
    expect(screen.getByText('Excellent'));
    fireEvent.mouseOver(document.getElementById('1'));
    expect(screen.getByText('Poor'));
    fireEvent.click(document.getElementById('3'));
    expect(screen.getByText('Average'));
    expect(document.getElementById("user-review-check")).toBeInTheDocument();
  });

  test('Write Review Title Functionality', () => {
    fireEvent.keyDown(screen.getByPlaceholderText('Ex: Great for hiking!'), {key: 'A', code: 'KeyA'});
    expect(document.getElementById('user-title-check')).toBeInTheDocument();
  })
});