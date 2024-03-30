import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from '../components/Login';

jest.mock('axios');

describe('Login component', () => {
  it('renders login form correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByText('SignUp')).toBeInTheDocument();
  });

  it('handles form submission with valid credentials', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        clientId: 'mockUserId',
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(localStorage.getItem('user')).toEqual('mockUserId');
    });
  });

  it('displays error message for empty fields', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Fields cannot be empty')).toBeInTheDocument();
  });

  it('displays error message for invalid email format', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'invalidemail' },
    });
   
  });


});