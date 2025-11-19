import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ApplicationsList from '../pages/admin/ApplicationsList.jsx';
import { getApplications } from '../utils/api.js';

vi.mock('../utils/api.js', () => ({
  getApplications: vi.fn(),
}));

describe('ApplicationsList', () => {
  const sampleResponse = {
    data: {
      applications: [
        {
          id: 'app-1',
          fullName: 'Jane Doe',
          email: 'jane@example.com',
          applyingFor: 'job',
          primaryStyle: 'Action',
          scoreAction: 10,
          scoreProcess: 5,
          scorePeople: 8,
          scoreIdeas: 7,
          status: 'applied',
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
    },
  };

  beforeEach(() => {
    getApplications.mockReset();
  });

  it('renders rows returned from API', async () => {
    getApplications.mockResolvedValueOnce(sampleResponse);

    render(
      <MemoryRouter>
        <ApplicationsList />
      </MemoryRouter>
    );

    await waitFor(() => expect(getApplications).toHaveBeenCalled());

    const row = await screen.findByText('Jane Doe');
    const rowNode = row.closest('tr');
    expect(rowNode).not.toBeNull();
    const utils = within(rowNode);
    expect(utils.getByText('jane@example.com')).toBeInTheDocument();
    expect(utils.getByText('Action')).toBeInTheDocument();
  });

  it('updates filters when search input changes', async () => {
    getApplications.mockResolvedValue(sampleResponse);

    render(
      <MemoryRouter>
        <ApplicationsList />
      </MemoryRouter>
    );

    await waitFor(() => expect(getApplications).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(searchInput, { target: { value: 'john' } });

    await waitFor(() => expect(getApplications).toHaveBeenCalledTimes(2));

    const lastCallArgs = getApplications.mock.calls.pop();
    expect(lastCallArgs[0]).toMatchObject({ search: 'john' });
  });
});
