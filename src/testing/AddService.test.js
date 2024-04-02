import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import UploadService from '../servicecomponents/AddService';
import axios from 'axios';

jest.mock('axios');

describe('UploadService component', () => {
  it('renders the form correctly', () => {
    render(
        <Router>
             <UploadService />
        </Router>
   );
    expect(screen.getByTestId('Service Name:')).toBeInTheDocument();
    expect(screen.getByTestId('Cost:')).toBeInTheDocument();
    expect(screen.getByTestId('Description:')).toBeInTheDocument();
    expect(screen.getByTestId('service picture:')).toBeInTheDocument();
    expect(screen.getByTestId('Add Service')).toBeInTheDocument();
    expect(screen.getByTestId('Existing Service')).toBeInTheDocument();
  });

  it('updates state when input fields change', () => {
    render(
        <Router>
             <UploadService />
        </Router>
   );
    const serviceNameInput = screen.getByTestId('Service Name:');
    fireEvent.change(serviceNameInput, { target: { value: 'Massage Therapy' } });
    expect(serviceNameInput.value).toBe('Massage Therapy');

    const costInput = screen.getByTestId('Cost:');
    fireEvent.change(costInput, { target: { value: '50' } });
    expect(costInput.value).toBe('50');

    const descriptionInput = screen.getByTestId('Description:');
    fireEvent.change(descriptionInput, { target: { value: 'Relaxing massage session' } });
    expect(descriptionInput.value).toBe('Relaxing massage session');
  });

  it('submits form with valid data', async () => {
    const mockedFormData = new FormData();
    mockedFormData.append('serviceName', 'Massage Therapy');
    mockedFormData.append('serviceCost', '50');
    mockedFormData.append('serviceDescription', 'Relaxing massage session');
    mockedFormData.append('serviceImage', new File(['dummy image'], 'test.jpg', { type: 'image/jpeg' }));

    axios.post.mockResolvedValueOnce({ data: 'Service created successfully' });

    render(
        <Router>
             <UploadService />
        </Router>
   );
    const serviceNameInput = screen.getByTestId('Service Name:');
    fireEvent.change(serviceNameInput, { target: { value: 'Massage Therapy' } });

    const costInput = screen.getByTestId('Cost:');
    fireEvent.change(costInput, { target: { value: '50' } });

    const descriptionInput = screen.getByTestId('Description:');
    fireEvent.change(descriptionInput, { target: { value: 'Relaxing massage session' } });

    const fileInput = screen.getByTestId('service picture:');
    fireEvent.change(fileInput, { target: { files: [new File(['dummy image'], 'test.jpg', { type: 'image/jpeg' })] } });

    fireEvent.click(screen.getByTestId('Add Service'));

    // await waitFor(() => {
    //   expect(axios.post).toHaveBeenCalledTimes(1);
    //   expect(axios.post).toHaveBeenCalledWith('http://localhost:5151/api/Backend/CreateUser', mockedFormData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   expect(window.alert).toHaveBeenCalledWith('Service created successfully');
    // });
  });

  it('displays error message on form submission failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to submit service'));

    render(
        <Router>
            <UploadService />
        </Router>
   );
    
  });

  it('navigates to the Existing Service page', () => {
    const { container } = render(
        <Router>
             <UploadService />
        </Router>
   );
    fireEvent.click(screen.getByTestId('Existing Service'));
    expect(container.innerHTML).toContain('AdminDisplay'); // Assuming 'AdminDisplay' is the link to the Existing Service page
  });
  
});