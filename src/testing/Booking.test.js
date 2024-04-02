import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Booking from '../appointmentcomponents/Booking';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('Booking Component', () => {
  test('renders without crashing', () => {
    render(<Router>
        <Booking />
        </Router>);
  });

  test('updates form data correctly when input fields are changed', async () => {
    render(<Router>
        <Booking />
        </Router>);
    const nameInput = screen.getByLabelText('Name*:');
    fireEvent.change(nameInput, { target: { value: 'Priya' } });
    expect(nameInput.value).toBe('Priya');

    const ageInput = screen.getByLabelText('Age*:');
    fireEvent.change(ageInput, { target: { value: '25' } });
    expect(ageInput.value).toBe('25');

    const telInput = screen.getByLabelText('Contact Number:');
    fireEvent.change(telInput, { target: { value: '9876543210' } });
    expect(telInput.value).toBe('9876543210');
    
  });

  test('submits form data when "Request For Appointment" button is clicked', async () => {
    render(<Router>
        <Booking />
        </Router>);
   
    // Add assertions here to check if form data is submitted correctly
  });

  test('fetches available appointments from API and renders them correctly', async () => {
    const mockAppointments = [
      { id: 1, date: '2024-04-01', time: '10:00 AM' },
      { id: 2, date: '2024-04-02', time: '11:00 AM' },
    ];
    axios.get.mockResolvedValue({ data: mockAppointments });

    render(<Router>
        <Booking />
        </Router>);

    await waitFor(() => {
      expect(screen.getByText('2024-04-01')).toBeInTheDocument();
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('2024-04-02')).toBeInTheDocument();
      expect(screen.getByText('11:00 AM')).toBeInTheDocument();
    });
  });

  test('posts booking when "Book" button is clicked on available appointment', async () => {
    const mockAppointments = [
      { id: 1, date: '2024-04-01', time: '10:00 AM' },
    ];
    axios.get.mockResolvedValue({ data: mockAppointments });
    axios.post.mockResolvedValue();

    render(<Router>
        <Booking />
        </Router>);

    await waitFor(() => {
      const bookButton = screen.getByText('Book');
      fireEvent.click(bookButton);
      // Add assertions here to check if booking is posted correctly
    });
  });

  test('logs out user when "Logout" button is clicked', async () => {
    localStorage.setItem('user', 'testUser');
    render(<Router>
        <Booking />
        </Router>);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('user'));
  });
});