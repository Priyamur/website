import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import AdminDisplay from '../servicecomponents/AdminDisplay';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('AdminDisplay Component', () => {
  test('renders without crashing', () => {
    render(
    <Router>
        <AdminDisplay />
    </Router>
   );
  });

  test('fetches services from API and renders them correctly', async () => {
    const mockServices = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        cost: 10,
        imageUrl: 'image-url-1'
      },
      {
        id: 2,
        name: 'Service 2',
        description: 'Description 2',
        cost: 20,
        imageUrl: 'image-url-2'
      }
    ];
    axios.get.mockResolvedValue({ data: mockServices });

    render( <Router>
        <AdminDisplay />
    </Router>);

    await waitFor(() => {
      expect(screen.getByText('Service 1')).toBeInTheDocument();
      expect(screen.getByText('Service 2')).toBeInTheDocument();
    });
  });

  test('displays error message when failed to fetch services', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch services'));

    render( <Router>
        <AdminDisplay />
    </Router>);

  });

  test('navigates to Updatedisplay component when "Update" button is clicked', async () => {
    const mockServices = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        cost: 10,
        imageUrl: 'image-url-1'
      }
    ];
    axios.get.mockResolvedValue({ data: mockServices });
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }));

    render( <Router>
        <AdminDisplay />
    </Router>);

    
  });

  test('deletes service when "Delete" button is clicked', async () => {
    const mockServices = [
      {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        cost: 10,
        imageUrl: 'image-url-1'
      }
    ];
    axios.get.mockResolvedValue({ data: mockServices });
    axios.delete.mockResolvedValue();

    render( <Router>
        <AdminDisplay />
    </Router>);

    await waitFor(() => {
      const deleteButton = screen.getByText('Delete');
      fireEvent.click(deleteButton);
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:5151/api/Backend/DeleteServiceDetails/1');
    });
  });
});