import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Appointment from '../components/Appointmentcomponents/Appointment';
import { BrowserRouter as Router  } from 'react-router-dom';


jest.mock('axios');

describe('Appointment component', () => {
  test('renders component properly', () => {
    render(<Appointment />);
    expect(screen.getByText('List of Appointments')).toBeInTheDocument();
  });

  test('displays appointments', async () => {
    const mockAppointments = [
      {
        appointmentId: 1,
        name: 'John Doe',
        clientAge: 30,
        date: '2024-04-01',
        time: '10:00 AM',
        phoneNumber: '9876543210',
        clientId: 1,
        serviceId: 1,
      },
      // Add more mock appointments as needed
    ];
    axios.get.mockResolvedValueOnce({ data: mockAppointments });
    axios.get.mockResolvedValueOnce({ data: { email: 'john@example.com' } });
    axios.get.mockResolvedValueOnce({ data: { serviceName: 'Massage' } });

    render(<Appointment />);

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    // Add more assertions for other appointment details
  });

 
  test('sends cancellation email and removes appointment', async () => {
    const mockAppointments = [
      {
        appointmentId: 1,
        name: 'Jane Doe',
        clientAge: 25,
        date: '2024-04-02',
        time: '11:00 AM',
        phoneNumber: '9876543210',
        clientId: 2,
        serviceId: 2,
      },
      // Add more mock appointments as needed
    ];
    axios.get.mockResolvedValueOnce({ data: mockAppointments });
    axios.get.mockResolvedValueOnce({ data: { email: 'jane@example.com' } });

    axios.delete.mockResolvedValueOnce({});
    axios.post.mockResolvedValueOnce({});
    render(
   
   <Router>
         <Appointment />
    </Router>
   );
  });

});