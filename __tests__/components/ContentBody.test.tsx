import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentBody from '@/components/ContentBody';
import { Content } from '@prismicio/client';
import '@testing-library/jest-dom/extend-expect';

const mockPage: Content.BlogPostDocument | Content.ProjectDocument = {
  id: 'test-id',
  uid: 'test-uid',
  type: 'blog_post',
  href: 'test-href',
  tags: ['tag1', 'tag2'],
  first_publication_date: '2023-01-01T00:00:00+0000',
  last_publication_date: '2023-01-02T00:00:00+0000',
  slugs: ['test-slug'],
  linked_documents: [],
  lang: 'en-us',
  data: {
    title: 'Test Title',
    date: '2023-01-01',
    slices: [],
    live: {
      url: 'https://example.com',
      target: '_blank',
    },
    youtube: {
      url: 'https://youtube.com',
      target: '_blank',
    },
    github: {
      url: 'https://github.com',
      target: '_blank',
    },
    medium: {
      url: 'https://medium.com',
      target: '_blank',
    },
  },
};

describe('ContentBody', () => {
  it('renders the title', () => {
    render(<ContentBody page={mockPage} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
  });

  it('renders the tags', () => {
    render(<ContentBody page={mockPage} />);
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders the formatted date', () => {
    render(<ContentBody page={mockPage} />);
    expect(screen.getByText('Sunday, January 1, 2023')).toBeInTheDocument();
  });

  it('renders the live website link', () => {
    render(<ContentBody page={mockPage} />);
    const liveLink = screen.getByText('Live Website');
    expect(liveLink).toBeInTheDocument();
    expect(liveLink.closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders the YouTube link', () => {
    render(<ContentBody page={mockPage} />);
    const youtubeLink = screen.getByText('Watch on YouTube');
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink.closest('a')).toHaveAttribute('href', 'https://youtube.com');
  });

  it('renders the GitHub link', () => {
    render(<ContentBody page={mockPage} />);
    const githubLink = screen.getByText('Github');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com');
  });

  it('renders the Medium link', () => {
    render(<ContentBody page={mockPage} />);
    const mediumLink = screen.getByText('Medium');
    expect(mediumLink).toBeInTheDocument();
    expect(mediumLink.closest('a')).toHaveAttribute('href', 'https://medium.com');
  });

  it('renders the slices using SliceZone', () => {
    render(<ContentBody page={mockPage} />);
    // Assuming you have a way to check that SliceZone is called correctly
    // e.g., by mocking SliceZone and checking its props
  });
});
