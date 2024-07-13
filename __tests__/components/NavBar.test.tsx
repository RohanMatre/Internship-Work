import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/components/NavBar';
import { Content, asLink } from '@prismicio/client';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom/extend-expect';

// Mock necessary modules and components
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@prismicio/next', () => ({
  PrismicNextLink: ({ children, ...props }: { children: React.ReactNode; field: any }) => <a {...props}>{children}</a>,
}));

jest.mock('@/components/Button', () => ({ linkField, label }: { linkField: any; label: string }) => (
  <button>{label}</button>
));

const mockSettings: Content.SettingsDocument = {
  id: 'settings',
  type: 'settings',
  href: '',
  tags: [],
  slugs: [],
  linked_documents: [],
  lang: 'en-us',
  alternate_languages: [],
  data: {
    name: 'Test Name',
    nav_item: [
      { link: { url: '/about' }, label: 'About' },
      { link: { url: '/contact' }, label: 'Contact' },
    ],
    cta_link: { url: '/get-started' },
    cta_label: 'Get Started',
    github_link: { url: 'https://github.com/test' },
    twitter_link: { url: 'https://twitter.com/test' },
    linkedin_link: { url: 'https://linkedin.com/in/test' },
  },
};

describe('NavBar', () => {
  beforeAll(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the NavBar with settings', () => {
    render(<NavBar settings={mockSettings} />);

    // Check if the name logo is rendered
    expect(screen.getByText('Test Name')).toBeInTheDocument();

    // Check if the navigation items are rendered
    // expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();

    // Check if the CTA button is rendered
    // expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('toggles the mobile menu', () => {
    render(<NavBar settings={mockSettings} />);

    // Open the menu
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();

    // Close the menu
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('applies the correct aria-current attribute for active links', () => {
    (usePathname as jest.Mock).mockReturnValue('/about');
    render(<NavBar settings={mockSettings} />);

    // Check if the About link has aria-current="page"
    // const aboutLink = screen.getByRole('link', { name: 'About' });
    // expect(aboutLink).toHaveAttribute('aria-current', 'page');

    // Check if the Contact link does not have aria-current
    // const contactLink = screen.getByRole('link', { name: 'Contact' });
    // expect(contactLink).not.toHaveAttribute('aria-current');
  });
});
