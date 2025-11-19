import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicationForm from '../pages/candidate/ApplicationForm.jsx';

describe('ApplicationForm', () => {
  const renderForm = () =>
    render(
      <BrowserRouter>
        <ApplicationForm />
      </BrowserRouter>
    );

  it('requires at least one skill before continuing', () => {
    renderForm();

    const continueButton = screen.getByRole('button', { name: /continue to test instructions/i });
    expect(continueButton).toBeDisabled();

    const skillInput = screen.getByPlaceholderText(/e.g., react, python, design/i);
    fireEvent.change(skillInput, { target: { value: 'React' } });
    fireEvent.click(screen.getByRole('button', { name: /add skill/i }));

    expect(continueButton).not.toBeDisabled();
  });
});
