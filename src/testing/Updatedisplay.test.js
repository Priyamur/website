import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Updatedisplay from '../servicecomponents/Updatedisplay';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Updatedisplay Component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Updatedisplay />
      </Router>
    );
    
  });

  test('updates service name input correctly', async () => {
    render(<Router>
      <Updatedisplay />
    </Router>);
    const serviceNameInput = screen.getByTestId('Service Name:');
    fireEvent.change(serviceNameInput, { target: { value: 'New Service Name' } });
    expect(serviceNameInput.value).toBe('New Service Name');
  });

  test('displays error message when service name contains numbers', async () => {
    render(<Router>
      <Updatedisplay />
    </Router>);
    const serviceNameInput = screen.getByTestId('Service Name:');
    fireEvent.change(serviceNameInput, { target: { value: 'Service Name123' } });
    const addButton = screen.getByTestId('Add Service');
   
  });

  test('updates service cost input correctly', async () => {
    render(
      <Router>
        <Updatedisplay />
      </Router>);
    const serviceCostInput = screen.getByTestId('Cost:');
    fireEvent.change(serviceCostInput, { target: { value: '50' } });
    expect(serviceCostInput.value).toBe('50');
  });

  test('updates service description input correctly', async () => {
    render(<Router>
      <Updatedisplay />
    </Router>);
    const serviceDescriptionInput = screen.getByTestId('Description:');
    fireEvent.change(serviceDescriptionInput, { target: { value: 'New Service Description' } });
    expect(serviceDescriptionInput.value).toBe('New Service Description');
  });

  test('updates service image input correctly', async () => {
    render(<Router>
      <Updatedisplay />
    </Router>);
    const serviceImageInput = screen.getByTestId('service picture:');
    fireEvent.change(serviceImageInput, { target: { files: [new File([''], 'serviceImage.png', { type: 'image/png' })] } });
    expect(serviceImageInput.files[0].name).toBe('serviceImage.png');
  });
});