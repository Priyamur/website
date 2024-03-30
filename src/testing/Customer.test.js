import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Customer from '../components/Appointmentcomponents/Customercomponents/Customer';

jest.mock('axios');

describe('Customer component', () => {
  test('renders component properly', () => {
    render(<Customer />);
    expect(screen.getByText('List of Customers Logged In')).toBeInTheDocument();
  });

  test('displays customers with appointments', async () => {
    const mockClients = [
      { clientId: 1, name: 'John Doe', age: 30, phoneNumber: '9876543210', email: 'john@example.com' },
      { clientId: 2, name: 'Jane Doe', age: 25, phoneNumber: '9876543211', email: 'jane@example.com' },
    ];
    const mockAppointments = [
      { appointmentId: 1, name: 'John Doe', clientAge: 30, phoneNumber: '9876543210', clientId: 1 },
      { appointmentId: 2, name: 'Jane Doe', clientAge: 25, phoneNumber: '9876543211', clientId: 2 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockClients });
    axios.get.mockResolvedValueOnce({ data: mockAppointments });

    render(<Customer />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    // Add more assertions for other customer details
  });

  test('displays "Email not found" for customers without email', async () => {
    const mockClients = [
      { clientId: 1, name: 'John Doe', age: 30, phoneNumber: '9876543210', email: 'john@example.com' },
    ];
    const mockAppointments = [
      { appointmentId: 1, name: 'John Doe', clientAge: 30, phoneNumber: '9876543210', clientId: 1 },
      { appointmentId: 2, name: 'Jane Doe', clientAge: 25, phoneNumber: '9876543211', clientId: 2 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockClients });
    axios.get.mockResolvedValueOnce({ data: mockAppointments });

    render(<Customer />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Email not found')).toBeInTheDocument();
    // Add more assertions as needed
  });

  // Add more test cases as needed
});