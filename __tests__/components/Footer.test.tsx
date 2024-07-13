import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { createClient } from '@/prismicio';
import '@testing-library/jest-dom/extend-expect';

// Mock the Prismic client
jest.mock('@/prismicio', () => ({
  createClient: jest.fn(),
}));

const mockSettings = {
  data: {
    name: 'Test Name',
    nav_item: [
      { link: { url: '/about' }, label: 'About' },
      { link: { url: '/contact' }, label: 'Contact' },
    ],
    github_link: { url: 'https://github.com/test' },
    twitter_link: { url: 'https://twitter.com/test' },
    linkedin_link: { url: 'https://linkedin.com/in/test' },
  },
};

describe('Footer', () => {
  beforeAll(() => {
    const mockClient = {
      getSingle: jest.fn().mockResolvedValue(mockSettings),
    };
    (createClient as jest.Mock).mockReturnValue(mockClient);
  });

  it('renders the footer with the correct information', async () => {
    render(await Footer());

    // Check name and year
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText(`© ${new Date().getFullYear()} Test Name`)).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Contact/i })).toHaveAttribute('href', '/contact');

    // Check social links
    expect(screen.getByLabelText('Test Name on GitHub')).toHaveAttribute('href', 'https://github.com/test');
    expect(screen.getByLabelText('Test Name on Twitter')).toHaveAttribute('href', 'https://twitter.com/test');
    expect(screen.getByLabelText('Test Name on LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/in/test');
  });

  it('renders with appropriate styling and classes', async () => {
    render(await Footer());

    // Check if the main container has the correct class
    const mainContainer = screen.getByRole('contentinfo');
    expect(mainContainer).toHaveClass('text-slate-600');
  });
});
