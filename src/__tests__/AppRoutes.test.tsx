import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

describe('App routes', () => {
  it('renders Home (Index) at root path', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    // Expect hero text from Index page
    expect(screen.getByText(/GovCom Solutions/i)).toBeInTheDocument();
  });

  it('renders AI Services at /ai-services', () => {
    render(
      <MemoryRouter initialEntries={["/ai-services"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Our Tech Services/i)).toBeInTheDocument();
  });

  it('renders AICenter at /ai-center', () => {
    render(
      <MemoryRouter initialEntries={["/ai-center"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/What We Deliver/i)).toBeInTheDocument();
  });
});

