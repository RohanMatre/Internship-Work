import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import RootLayoutTestWrapper from '@/app/RootLayoutTestWrapper'; // Import the simplified wrapper
import { Urbanist } from 'next/font/google';
import { PrismicPreview } from '@prismicio/next';
import { createClient, repositoryName } from '@/prismicio';

// Mock the Urbanist font
jest.mock('next/font/google', () => ({
  Urbanist: () => ({
    className: 'urbanist-font',
  }),
}));

// Mock the Header component
jest.mock('@/src/components/Header', () => () => <div data-testid="header">Header</div>);

// Mock the Footer component
jest.mock('@/src/components/Footer', () => () => <div data-testid="footer">Footer</div>);

// Mock PrismicPreview component
jest.mock('@prismicio/next', () => ({
  PrismicPreview: jest.fn(() => <div data-testid="prismic-preview">Prismic Preview</div>),
}));

// Mock the Prismic client
jest.mock('@/src/prismicio', () => ({
  createClient: jest.fn(),
  repositoryName: 'test-repo',
}));

describe('RootLayoutTestWrapper', () => {
  it('renders the layout with Header, Footer, and PrismicPreview', () => {
    const { container } = render(
      <RootLayoutTestWrapper>
        <div data-testid="content">Content</div>
      </RootLayoutTestWrapper>
    );

    // Check if Header, Footer, and PrismicPreview are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('prismic-preview')).toBeInTheDocument();

    // Check if children content is rendered
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Check if the correct classes are applied
    expect(container.firstChild).toHaveClass('bg-blue-950', 'text-slate-100');
    expect(container.querySelector('div')).toHaveClass('urbanist-font', 'relative', 'min-h-screen');
  });
});
