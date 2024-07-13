import React from 'react';
import { render } from '@testing-library/react';
import Heading from '@/components/Heading';

describe('Heading component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Heading>Test Heading</Heading>);
    expect(getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders with default "h1" tag when no "as" prop is provided', () => {
    const { container } = render(<Heading>Test Heading</Heading>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('renders with specified tag when "as" prop is provided', () => {
    const { container } = render(<Heading as="h2">Test Heading</Heading>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    const { container } = render(<Heading className="custom-class">Test Heading</Heading>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies size "xl" correctly', () => {
    const { container } = render(<Heading size="xl">Test Heading</Heading>);
    expect(container.firstChild).toHaveClass('text-7xl md:text-9xl');
  });

  it('applies size "lg" correctly', () => {
    const { container } = render(<Heading size="lg">Test Heading</Heading>);
    expect(container.firstChild).toHaveClass('text-6xl md:text-8xl');
  });

  it('applies size "md" correctly', () => {
    const { container } = render(<Heading size="md">Test Heading</Heading>);
    expect(container.firstChild).toHaveClass('text-5xl md:text-6xl');
  });

  it('applies size "sm" correctly', () => {
    const { container } = render(<Heading size="sm">Test Heading</Heading>);
    expect(container.firstChild).toHaveClass('text-3xl md:text-4xl');
  });
});
