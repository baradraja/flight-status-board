import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightListing from '../components/FlightListing';
import axios from 'axios';

jest.mock('axios');
test('renders Flight Listings title', async () => {
  render(<FlightListing />);

  const titleElement = screen.getByText('Flight Listings');
  expect(titleElement).toBeInTheDocument();
});

// Add more test cases for FlightListing component as needed
