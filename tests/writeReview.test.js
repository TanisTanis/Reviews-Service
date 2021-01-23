import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import WriteReview from '../client/src/components/WriteReview';
import fakeData from './fakeData';
jest.mock('axios');

describe('Write Review Modal', () => {

  beforeEach(async () => {
    try {
      await render(<WriteReview />);
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });


  test('Review Stars Functionality', () => {
    fireEvent.mouseOver(document.getElementById('5'));
    expect(screen.getByText('Excellent'));
    fireEvent.mouseOver(document.getElementById('1'));
    expect(screen.getByText('Poor'));
    fireEvent.click(document.getElementById('3'));
    expect(screen.getByText('Average'));
  });

  test('Won\'t submit review until all fields are filled out', () => {
    fireEvent.click(document.getElementById('submit-button'));
    expect(screen.getByText('Please fill out all required fields.'));
  });

});