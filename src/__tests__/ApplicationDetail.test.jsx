import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ApplicationDetail from '../pages/admin/ApplicationDetail.jsx';
import {
  getApplication,
  updateApplicationNotes,
  updateApplicationStatus,
  createInterview,
  deleteApplication,
} from '../utils/api.js';

vi.mock('../utils/api.js', () => ({
  getApplication: vi.fn(),
  updateApplicationNotes: vi.fn(),
  updateApplicationStatus: vi.fn(),
  createInterview: vi.fn(),
  deleteApplication: vi.fn(),
}));

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'app-1' }),
    useNavigate: () => mockedNavigate,
  };
});

describe('ApplicationDetail', () => {
  const sampleApplication = {
    id: 'app-1',
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    course: 'Computer Science',
    collegeName: 'Example University',
    applyingFor: 'job',
    collegeTiming: '9 AM - 3 PM',
    address: '123 Example Street',
    skills: 'React, Node',
    hasWorkedBefore: true,
    previousExperienceDetails: 'Interned at Example Corp',
    wantsToLearnAiWithUs: true,
    aiLearningNotes: 'Interested in AI',
    resumeDriveLink: 'https://drive.google.com/file/d/123/view',
    scoreAction: 10,
    scoreProcess: 8,
    scorePeople: 7,
    scoreIdeas: 5,
    primaryStyle: 'Action',
    totalSelected: 40,
    notes: 'Initial note',
    status: 'applied',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    interviews: [],
  };

  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    getApplication.mockReset();
    updateApplicationNotes.mockReset();
    updateApplicationStatus.mockReset();
    createInterview.mockReset();
    deleteApplication.mockReset();
    mockedNavigate.mockReset();
  });

  afterEach(() => {
    window.alert.mockRestore();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <ApplicationDetail />
      </MemoryRouter>
    );

  it('renders application details after loading', async () => {
    getApplication.mockResolvedValueOnce({ data: sampleApplication });

    renderComponent();

    expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(getApplication).toHaveBeenCalledWith('app-1');
  });

  it('saves notes when clicking save button', async () => {
    getApplication.mockResolvedValueOnce({ data: sampleApplication });
    updateApplicationNotes.mockResolvedValueOnce({});

    renderComponent();

    const textarea = await screen.findByPlaceholderText(/add notes/i);
    fireEvent.change(textarea, { target: { value: 'Updated note' } });

    const saveButton = screen.getByRole('button', { name: /save notes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateApplicationNotes).toHaveBeenCalledWith('app-1', 'Updated note');
    });
  });
});
