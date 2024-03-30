import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from '../components/Login';
import SignUp from '../components/Signup';

jest.mock('axios');

describe('Signup component', () =>{
    it('renders signup form correctly', () => {
        render(
            <Router>
                <SignUp />
            </Router>
        );
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter confirm password')).toBeInTheDocument();
       
    });
    it ('handles from submission with valid credentials', async () => {
        axios.post.mockResolvedValueOnce({
            status: 200,
            data : {
                clientId : 'mockUserId',
            },

        });
        render(
            <Router>
                <SignUp/>
            </Router>
        );
        fireEvent.change(screen.getByPlaceholderText('Enter email'),{
            target: {value: 'test@example.com'},
        });
        fireEvent.change(screen.getByPlaceholderText('Enter password'), {
            target: { value: 'password' },
        });

        fireEvent.change(screen.getByPlaceholderText('Enter confirm password'), {
            target: { value: 'confirm password' },
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

