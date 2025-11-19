import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Dashboard from '../pages/admin/Dashboard.jsx';
import { getDashboardStats } from '../utils/api.js';

vi.mock('../utils/api.js', () => ({
  getDashboardStats: vi.fn(),
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

describe('Admin Dashboard', () => {
  const sampleStats = {
    totalApplications: 5,
    statusCounts: {
      shortlisted: 2,
      interview_scheduled: 1,
      selected: 1,
    },
    styleCounts: {
      Action: 2,
      Process: 1,
      People: 1,
      Ideas: 1,
    },
    applyingForCounts: {
      job: 3,
      internship: 1,
      freelancer: 1,
    },
    recentApplications: [
      {
        id: 'app-1',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        applyingFor: 'job',
        primaryStyle: 'Action',
        status: 'applied',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  };

  beforeEach(() => {
    getDashboardStats.mockReset();
  });

  it('renders dashboard stats after loading', async () => {
    getDashboardStats.mockResolvedValueOnce({ data: sampleStats });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText('Total Applications')).toBeInTheDocument();
    expect(await screen.findByText('5')).toBeInTheDocument();
    expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
  });
});
