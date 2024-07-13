import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '@/components/Header';
import { createClient } from '@/prismicio';
import NavBar from '@/components/NavBar';
import '@testing-library/jest-dom/extend-expect';

// Mock the Prismic client
jest.mock('@/prismicio', () => ({
  createClient: jest.fn(),
}));

jest.mock('@/components/NavBar', () => jest.fn(() => <div>Mock NavBar</div>));

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

describe('Header', () => {
  beforeAll(() => {
    const mockClient = {
      getSingle: jest.fn().mockResolvedValue(mockSettings),
    };
    (createClient as jest.Mock).mockReturnValue(mockClient);
  });

  it('renders the header with the NavBar component', async () => {
    render(await Header());

    // Check if the NavBar component is rendered
    await waitFor(() => expect(NavBar).toHaveBeenCalledWith({ settings: mockSettings }, {}));
    expect(screen.getByText('Mock NavBar')).toBeInTheDocument();
  });

  it('applies the correct class names to the header', async () => {
    render(await Header());

    // Check if the header has the correct class names
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4');
  });
});
