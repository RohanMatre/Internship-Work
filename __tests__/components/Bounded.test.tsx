import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bounded from '@/components/Bounded';

describe('Bounded', () => {
  it('renders with default props', () => {
    const { container } = render(
      <Bounded>
        <p>Test Content</p>
      </Bounded>
    );

    const boundedElement = container.firstChild as HTMLElement;
    expect(boundedElement).not.toBeNull();
    expect(boundedElement).toBeInTheDocument();
    expect(boundedElement).toHaveClass('px-4 py-10 md:px-6 md:py-14 lg:py-16');
  });

  it('renders with custom component and className', () => {
    const { container } = render(
      <Bounded as="div" className="custom-class">
        <p>Test Content</p>
      </Bounded>
    );

    const boundedElement = container.firstChild as HTMLElement;
    expect(boundedElement).not.toBeNull();
    expect(boundedElement).toBeInTheDocument();
    expect(boundedElement.tagName).toBe('DIV');
    expect(boundedElement).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Bounded>
        <p>Test Content</p>
      </Bounded>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
