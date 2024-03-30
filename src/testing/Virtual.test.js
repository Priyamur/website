import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Virtual from '../appointmentcomponents/Virtual';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('Virtual component', () => {
  test('renders component properly', () => {
    render(
        <Router>
            <Virtual />
        </Router>
    );
    expect(screen.getByText('We will serve you virtually')).toBeInTheDocument();
  });

  test('allows user to input name', () => {
    render(  <Router>
        <Virtual />
    </Router>);
    const nameInput = screen.getByLabelText('Name*:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput).toHaveValue('John');
  });

  test('allows user to input age', () => {
    render(  <Router>
        <Virtual />
    </Router>);
    const ageInput = screen.getByLabelText('Age*:');
    fireEvent.change(ageInput, { target: { value: '25' } });
    expect(ageInput).toHaveValue('25');
  });

  test('allows user to input contact number', () => {
    render(  <Router>
        <Virtual />
    </Router>);
    const contactInput = screen.getByLabelText('Contact Number:');
    fireEvent.change(contactInput, { target: { value: '9876543210' } });
    expect(contactInput).toHaveValue('9876543210');
  });

  test('allows user to select appointment service', () => {
    render(  <Router>
        <Virtual />
    </Router>);
    const serviceSelect = screen.getByTestId('Virtual Consultation');
  });

  test('allows user to input appointment date and time', async () => {
    render(  <Router>
        <Virtual />
    </Router>);
    const dateInput = screen.getByTestId('Date*:');

    fireEvent.change(dateInput, { target: { value: '2024-04-01' } });
    expect(dateInput).toHaveValue('2024-04-01');

    const timeInput = screen.getByTestId('Time*:');

    fireEvent.change(timeInput, { target: { value: '10:00' } });
    expect(timeInput).toHaveValue('10:00');
  });

  test('submits appointment form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(
    <Router>
        <Virtual />
    </Router>);
    const nameInput = screen.getByLabelText('Name*:');
    fireEvent.change(nameInput, { target: { value: 'John' } });

    const ageInput = screen.getByLabelText('Age*:');
    fireEvent.change(ageInput, { target: { value: '25' } });

    const contactInput = screen.getByLabelText('Contact Number:');
    fireEvent.change(contactInput, { target: { value: '9876543210' } });

    const dateInput = screen.getByTestId('Date*:');
    fireEvent.change(dateInput, { target: { value: '2024-04-01' } });

    const timeInput = screen.getByTestId('Time*:');
    fireEvent.change(timeInput, { target: { value: '10:00' } });

    const submitButton = screen.getByRole('button', { name: /Request For Appointment/i });
    fireEvent.click(submitButton);

  });
});