import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Calender from '../appointmentcomponents/Calender';
import { BrowserRouter as Router } from 'react-router-dom';
import AppointmentsCalendar from '../appointmentcomponents/Calender';

jest.mock('axios');

describe('AppointmentsCalendar component', () => {
  test('renders component properly', () => {
    render(<AppointmentsCalendar/>);
    expect(screen.getByText('Available Appointments')).toBeInTheDocument();
   
  });

  test('displays available appointments', async () => {
    const appointments = [
      { id: 1, date: '2024-04-01', time: '10:00 AM' },
      { id: 2, date: '2024-04-02', time: '11:00 AM' },
    ];
  
  });

  test('handles error gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Fetch failed'));
    render(<AppointmentsCalendar />);
  });

  test('button is clickable', async () => {
    const appointments = [{ id: 1, date: '2024-04-01', time: '10:00 AM' }];
    axios.get.mockResolvedValue({ data: appointments });
    render(<AppointmentsCalendar />);
    const button = await screen.findByText('Book');
    userEvent.click(button);
    // Write assertion for what happens when button is clicked
  });

  test('renders table with proper columns', async () => {
    const appointments = [{ id: 1, date: '2024-04-01', time: '10:00 AM' }];
    axios.get.mockResolvedValue({ data: appointments });
    render(<AppointmentsCalendar />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});