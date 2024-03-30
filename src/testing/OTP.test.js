import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { MemoryRouter, Router } from 'react-router-dom';
import OTP from '../components/OTP';

jest.mock('axios');

describe('OTP component', () => {
  test('renders component properly', () => {
    render(<OTP />, { wrapper: MemoryRouter });
    expect(screen.getByText('OTP Verification')).toBeInTheDocument();
  });

  test('displays error message for invalid OTP', async () => {
    render(<OTP />, { wrapper: MemoryRouter });
    fireEvent.change(screen.getByPlaceholderText('Enter number'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Invalid OTP')).toBeInTheDocument();
  });

  test('submits OTP successfully', async () => {
    const mockLocation = { state: { otp: '123456' } };
    render(<OTP />, { wrapper: MemoryRouter, initialEntries: ['/OTP'], initialIndex: 0, context: { router: { location: mockLocation } } });
    fireEvent.change(screen.getByPlaceholderText('Enter number'), { target: { value: '123456' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      
    });
  });

  test('handles incorrect OTP submission', async () => {
    const mockLocation = { state: { otp: '123456' } };
    render(<OTP />, { wrapper: MemoryRouter, initialEntries: ['/OTP'], initialIndex: 0, context: { router: { location: mockLocation } } });
    fireEvent.change(screen.getByPlaceholderText('Enter number'), { target: { value: '654321' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Invalid OTP')).toBeInTheDocument();
  });

});