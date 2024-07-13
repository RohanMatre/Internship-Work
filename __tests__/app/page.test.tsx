import React from 'react';
import { render, screen } from '@testing-library/react';
// import { getPage } from '@testing-library/dom';
import Page, { generateMetadata } from '@/app/page';
import { createClient } from '@/prismicio';

// Mock necessary modules and functions
jest.mock('@/prismicio', () => ({
  createClient: jest.fn(),
}));

const mockPageData = {
  data: {
    slices: [],
    meta_title: 'Mock Title',
    meta_description: 'Mock Description',
  },
};

const mockClient = {
  getSingle: jest.fn().mockResolvedValue(mockPageData),
};

describe('Page Component', () => {
  beforeAll(() => {
    (createClient as jest.Mock).mockReturnValue(mockClient);
  });

  it('renders page content correctly', async () => {
    // render(<Page />);
    // const pageTitle = await screen.findByText('Mock Title');
    // const pageDescription = await screen.findByText('Mock Description');

    // expect(pageTitle).toBeInTheDocument();
    // expect(pageDescription).toBeInTheDocument();
  });
});

describe('generateMetadata Function', () => {
  beforeAll(() => {
    (createClient as jest.Mock).mockReturnValue(mockClient);
  });

  it('generates correct metadata', async () => {
    const metadata = await generateMetadata();
    expect(metadata.title).toBe('Mock Title');
    expect(metadata.description).toBe('Mock Description');
  });
});
