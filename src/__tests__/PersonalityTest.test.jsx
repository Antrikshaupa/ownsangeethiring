import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PersonalityTest from '../pages/candidate/PersonalityTest.jsx';
import { submitApplication } from '../utils/api.js';
import { vi } from 'vitest';

vi.mock('../utils/api.js', () => ({
  submitApplication: vi.fn(),
}));

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('PersonalityTest', () => {
  const setApplicationData = (data = {}) => {
    sessionStorage.setItem(
      'applicationData',
      JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        ...data,
      })
    );
  };

  const answerAllQuestions = () => {
    const radios = screen.getAllByRole('radio');
    for (let i = 0; i < radios.length; i += 2) {
      fireEvent.click(radios[i]);
    }
  };

  beforeEach(() => {
    sessionStorage.clear();
    mockedNavigate.mockClear();
    submitApplication.mockReset();
  });

  it('redirects to /apply when no session data exists', () => {
    render(
      <MemoryRouter>
        <PersonalityTest />
      </MemoryRouter>
    );

    expect(mockedNavigate).toHaveBeenCalledWith('/apply');
  });

  it('submits answers and navigates to thank you page', async () => {
    setApplicationData();
    submitApplication.mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <PersonalityTest />
      </MemoryRouter>
    );

    answerAllQuestions();

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitApplication).toHaveBeenCalledTimes(1);
    });

    const payload = submitApplication.mock.calls[0][0];
    expect(payload.fullName).toBe('Test User');
    expect(Array.isArray(payload.testAnswers)).toBe(true);
    expect(payload.testAnswers.filter((ans) => ans === 'left').length).toBe(40);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/thank-you');
    });

    expect(sessionStorage.getItem('applicationData')).toBeNull();
  });
});
