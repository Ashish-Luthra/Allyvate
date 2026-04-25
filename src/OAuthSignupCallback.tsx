/**
* OAuth Signup Callback Handler
*
* Handles OAuth callback after Google signup authorization.
* Backend has already created the account and set the auth cookie.
* This component fetches user profile and redirects to conversation page.
*/

import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Spin, Alert } from '@/components/antd';
import { useAppDispatch } from '@/store/hooks';
import { googleSignup } from '@/store/features/auth';

const REDIRECT_DELAY_SUCCESS = 1500;
const REDIRECT_DELAY_ERROR = 3000;

export function OAuthSignupCallback() {
  const { platform } = useParams<{ platform: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const hasProcessed = useRef(false);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Handle OAuth callback result
   * Backend has already created account and set auth cookie
   */
  const handleCallback = useCallback(async () => {
    // Prevent duplicate processing
    if (hasProcessed.current) {
      return;
    }
    hasProcessed.current = true;

    // Validate platform
    if (platform !== 'google') {
      setStatus('error');
      setErrorMessage('Invalid OAuth platform.');
      redirectTimeoutRef.current = setTimeout(() => navigate('/signup'), REDIRECT_DELAY_ERROR);
      return;
    }

    // Check for success or error in URL params
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');

      // Map error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        access_denied: 'Authorization was denied or cancelled.',
        missing_params: 'Missing required parameters.',
        invalid_state: 'Security verification failed. Please try again.',
        platform_mismatch: 'Platform verification failed. Please try again.',
        callback_failed: 'Failed to complete signup. Please try again.',
      };

      setErrorMessage(errorMessages[error] || decodeURIComponent(error) || 'An error occurred during signup.');

      // Clean up state
      sessionStorage.removeItem('oauth_state_google');

      redirectTimeoutRef.current = setTimeout(() => navigate('/signup'), REDIRECT_DELAY_ERROR);
      return;
    }

    if (success === 'true') {
      // Clean up state
      sessionStorage.removeItem('oauth_state_google');

      try {
        // Fetch user profile to update auth state
        const result = await dispatch(googleSignup());

        if (googleSignup.fulfilled.match(result)) {
          setStatus('success');
          // Redirect to conversation page after short delay
          redirectTimeoutRef.current = setTimeout(() => {
            navigate('/conversation');
          }, REDIRECT_DELAY_SUCCESS);
        } else if (googleSignup.rejected.match(result)) {
          setStatus('error');
          const errorPayload = typeof result.payload === 'string' ? result.payload : 'Failed to complete signup. Please try again.';
          setErrorMessage(errorPayload);
          redirectTimeoutRef.current = setTimeout(() => navigate('/signup'), REDIRECT_DELAY_ERROR);
        }
      } catch (error) {
        console.error('OAuth signup callback error:', error);
        setStatus('error');
        setErrorMessage('An unexpected error occurred.');
        redirectTimeoutRef.current = setTimeout(() => navigate('/signup'), REDIRECT_DELAY_ERROR);
      }
    } else {
      // No success or error - unexpected state
      setStatus('error');
      setErrorMessage('Unexpected response from OAuth provider.');
      redirectTimeoutRef.current = setTimeout(() => navigate('/signup'), REDIRECT_DELAY_ERROR);
    }
  }, [dispatch, navigate, platform, searchParams]);

  useEffect(() => {
    handleCallback();

    return () => {
      // Cleanup: clear any pending redirects
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, [handleCallback]); // Run once on mount; guarded against duplicate processing

  if (status === 'processing') {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-bg-lightest">
        <div className="text-center space-y-4">
          <Spin size="large" />
          <p className="typography-body text-gray-text-secondary">Completing signup...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-bg-lightest">
        <div className="max-w-md w-full p-6">
          <Alert
            message="Success!"
            description="Your account has been created successfully. Redirecting..."
            type="success"
            showIcon
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-blue-bg-lightest">
      <div className="max-w-md w-full p-6">
        <Alert
          message="Signup Failed"
          description={errorMessage || 'An error occurred during signup.'}
          type="error"
          showIcon
        />
      </div>
    </div>
  );
}

