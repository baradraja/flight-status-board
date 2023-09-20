import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders Flight Listing route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const flightListingsTitle = screen.getByText(/Flight Listings/i);
  expect(flightListingsTitle).toBeInTheDocument();
});

// You can add more test cases for the App component as needed
