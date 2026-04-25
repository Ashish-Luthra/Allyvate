import '@testing-library/jest-dom/vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { OAuthSignupCallback } from './OAuthSignupCallback';

function renderCallback(route: string) {
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/oauth/:platform/signup/callback" element={<OAuthSignupCallback />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('OAuthSignupCallback', () => {
  it('shows success after successful Google signup', async () => {
    renderCallback('/oauth/google/signup/callback?success=true');

    expect(screen.getByText('Completing signup...')).toBeInTheDocument();
    await act(async () => {});
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Your account has been created successfully. Redirecting...')).toBeInTheDocument();
  });

  it('shows a friendly OAuth error', async () => {
    renderCallback('/oauth/google/signup/callback?error=invalid_state');

    expect(screen.getByText('Signup Failed')).toBeInTheDocument();
    expect(screen.getByText('Security verification failed. Please try again.')).toBeInTheDocument();
  });
});
