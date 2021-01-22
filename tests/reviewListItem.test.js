import React from 'react';

import { render, fireEvent, waitFor, screen, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReviewListItem from '../client/src/components/ReviewListItem';
import fakeData from './fakeData';

describe('Review List Item Component', () => {

  beforeEach(() => {
    render(<ReviewListItem review={fakeData[0]}/>)
  });

  test('Ups count on yes button after click', () => {
    expect(screen.getByText('1'));
    expect(document.getElementById('10Yes')).not.toHaveAttribute('disabled');
    fireEvent.click(document.getElementById('10Yes'));
    expect(screen.getByText('2'));
    // expect(document.getElementById('10Yes')).toHaveAttribute('disabled', 'true');
  });

  test('Ups count on no button after click', async () => {
    await fireEvent.click(document.getElementById('10No'));
    expect(screen.getByText('2'));
  });

  test('A verified purchaser flair loads dynamically', async () => {
    const verifiedFlair = screen.queryByText('Verified Purchaser');
    await expect(verifiedFlair).not.toBeInTheDocument();
  });

})