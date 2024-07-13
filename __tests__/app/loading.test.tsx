import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '@/app/loading';

describe('App Component', () => {
  it('renders loader and main content correctly', async () => {
    render(<App />);

    // Check if loader is initially rendered
    // const loader = screen.getByTestId('loading-animation');
    // expect(loader).toBeInTheDocument();

    // Wait for the loading animation to disappear (after 10.5 seconds)
    await waitFor(() => {
      const mainContent = screen.getByText('Main Content');
      expect(mainContent).toBeInTheDocument();
    });

    // Check if main content is displayed
    const mainContent = screen.getByText('Main Content');
    expect(mainContent).toBeInTheDocument();
  });
});
