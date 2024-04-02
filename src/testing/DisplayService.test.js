import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DisplayService from '../servicecomponents/DisplayService';

describe('DiplayService component', () => {
  it('renders heading text correctly', () => {
    render(
      <Router>
        <DisplayService />
      </Router>
    );
    expect(screen.getByText('OUR SERVICES')).toBeInTheDocument();
    expect(screen.getByText('Our services only for our customer happiness')).toBeInTheDocument();
    expect(screen.getByText('List of our services')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    render(
      <Router>
        <DisplayService />
      </Router>
    );
    expect(screen.getByText('HOMEPAGE')).toBeInTheDocument();
    expect(screen.getByText('SPA SERVICES')).toBeInTheDocument();
    expect(screen.getByText('VIRTUAL CONSULTATION')).toBeInTheDocument();
    expect(screen.getByText('VALUES')).toBeInTheDocument();
    expect(screen.getByText('HEADQUATERS')).toBeInTheDocument();
    expect(screen.getByText('BEST SERVICE')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders product details correctly', () => {
    render(
      <Router>
        <DisplayService />
      </Router>
    );
    // Assuming there are products with these details in the mocked data
    
    // Add more expectations for product details as needed
  });
  it('renders search input correctly', () => {
    render(
      <Router>
        <DisplayService />
      </Router>
    );
    expect(screen.getByPlaceholderText('Search our products')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders button texts correctly', () => {
    render(
      <Router>
        <DisplayService />
      </Router>
    );
 
  });
});