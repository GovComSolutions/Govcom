import { render, screen } from '@testing-library/react';
import PageHeader from '@/components/PageHeader';

describe('PageHeader', () => {
  it('renders title, subtitle and optional description', () => {
    render(<PageHeader title="Title" subtitle="Subtitle" description="Desc" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('renders without description', () => {
    render(<PageHeader title="OnlyTitle" subtitle="OnlySubtitle" />);
    expect(screen.getByText('OnlyTitle')).toBeInTheDocument();
    expect(screen.getByText('OnlySubtitle')).toBeInTheDocument();
  });
});

