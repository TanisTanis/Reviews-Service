import React from 'react';

import { render, fireEvent, waitFor, screen, queryByText } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import ReviewListItem from '../client/src/components/ReviewListItem';
import fakeData from './fakeData';
jest.mock('axios');


describe('Review List Item Component', () => {

  beforeEach(async () => {
    try {
      render(<ReviewListItem review={fakeData.reviews[0]} />)
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  test('Ups count on yes button after click', async () => {
    try {
      axios.patch.mockResolvedValue({
        data: {
          success: 'Successful Patch',
        },
      });
      act(() => {
        fireEvent.click(document.getElementById('10Yes'));
      })
      expect(screen.getByText('2'));
    } catch (err) {
      expect(err).toEqual(new Error());
    }
  });

  test('A verified purchaser flair loads dynamically', async () => {
    const verifiedFlair = screen.queryByText('Verified Purchaser');
    expect(verifiedFlair).not.toBeInTheDocument();
  });

});