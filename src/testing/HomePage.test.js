import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from '../components/Homepage';

describe('Homepage component', () => {
  it('renders heading text correctly', () => {
    render(<Homepage />);
    expect(screen.getByText('Ray Spa')).toBeInTheDocument();
    expect(screen.getByText(/We will make your own starlight/i)).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    render(<Homepage />);
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('SPA SERVICES')).toBeInTheDocument();
    expect(screen.getByText('VALUES')).toBeInTheDocument();
    expect(screen.getByText('HEADQUATERS')).toBeInTheDocument();
    expect(screen.getByText('BEST SERVICE')).toBeInTheDocument();
    expect(screen.getByText('NEWLY LAUNCHED SERVICE')).toBeInTheDocument();
  });

  it('renders footer contact information correctly', () => {
    render(<Homepage />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('New York, US')).toBeInTheDocument();
    expect(screen.getByText('+00 1515151515')).toBeInTheDocument();
    expect(screen.getByText(/raycosmetics@gmail.com/i)).toBeInTheDocument();
  });

  it('renders service descriptions correctly', () => {
    render(<Homepage />);
    expect(screen.getByText(/The Power of our services/i)).toBeInTheDocument();
    expect(screen.getByText(/Valentine's Day Special service/i)).toBeInTheDocument();
    expect(screen.getByText(/We will bring our spa to every home/i)).toBeInTheDocument();
    expect(screen.getByText(/We only belong to vegan community/i)).toBeInTheDocument();
    expect(screen.getByText(/We are the certified one around the world/i)).toBeInTheDocument();
    expect(screen.getByText(/Thousands of people pouring their hardwork/i)).toBeInTheDocument();
  });

  it('renders button texts correctly', () => {
    render(<Homepage />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByTestId('Book Now')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });
});