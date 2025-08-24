import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ThemeContextProvider } from '@/contexts/ThemeContextProvider';
import ModalProvider from '@ebay/nice-modal-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { AuthContextProvider } from './AuthContextProvider';

const googleClientId =
  '585003491830-54t0ubjnm19cq1k7691087ptq7pjkrmf.apps.googleusercontent.com';

const onHttpError = (
  error: any,
  _variables: any,
  _context: any,
  mutation: any
) => {
  // If this has an onError defined, skip this
  if (mutation?.options?.onError) return;

  toast.error(error.response.data.message, {
    toastId: error.response.data.message,
  });
};

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: onHttpError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000,
    },
  },
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <ThemeContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ModalProvider.Provider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </ModalProvider.Provider>
          </LocalizationProvider>
        </ThemeContextProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default ContextProvider;
