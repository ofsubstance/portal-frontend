import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, CircularProgress } from '@mui/material';
import useAuthAction from '@/hooks/useAuthAction';

const VerifyEmailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const location = useLocation();
  const { verifyEmail } = useAuthAction();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      verifyEmail.mutate(token, {
        onSuccess: () => {
          setVerificationStatus(
            'Email successfully verified! You can now log in.'
          );
          setIsLoading(false);
        },
        onError: () => {
          setVerificationStatus(
            'Verification failed. Please try again or request a new link.'
          );
          setIsLoading(false);
        },
      });
    } else {
      setVerificationStatus('Invalid verification link.');
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    if (
      verificationStatus === 'Email successfully verified! You can now log in.'
    ) {
      setTimeout(() => {
        window.location.href = '/signin';
      }, 3000);
    }
  }, [verificationStatus]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h5" color="textPrimary">
            {verificationStatus}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {verificationStatus ===
            'Email successfully verified! You can now log in.'
              ? 'You will be redirected to the login page in a few seconds.'
              : 'Please contact support for further assistance.'}
          </Typography>
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
