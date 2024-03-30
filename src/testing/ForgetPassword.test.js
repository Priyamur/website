import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import ForgetPassword from '../components/ForgetPassword';

jest.mock('axios');

describe('ForgetPassword component', () => {
  test('renders component properly', () => {
    render(<ForgetPassword />, { wrapper: MemoryRouter });
    expect(screen.getByText('Forget Password')).toBeInTheDocument();
  });

  test('displays error message for invalid email', async () => {
    render(<ForgetPassword />, { wrapper: MemoryRouter });
    const emailInput = screen.getByPlaceholderText('Enter email');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  test('sends OTP successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { sOTP: '123456' } });
    const navigateMock = jest.fn();
    render(<ForgetPassword />, { wrapper: MemoryRouter });
    const emailInput = screen.getByPlaceholderText('Enter email');
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5151/api/LoginSignup/forgotpassword?email=validemail@example.com');
    
    });
  });

  test('handles server error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Server Error'));
    render(<ForgetPassword />, { wrapper: MemoryRouter });
    const emailInput = screen.getByPlaceholderText('Enter email');
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.click(screen.getByText('Submit'));

  });

  // Add more test cases as needed
});