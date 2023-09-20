import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import FlightDetails from '../components/FlightDetails';
import axios from 'axios';

test('renders Flight Details title', () => {
  render(<FlightDetails />);
  const titleElement = screen.getByText('Flight Details');
  expect(titleElement).toBeInTheDocument();
});

// You can add more test cases for FlightDetails component as needed
