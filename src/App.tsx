import { Outlet, useLocation } from 'react-router-dom';
import ContextProvider from '@/contexts/ContextProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import LoadingOverlay from './components/common/loader/LoadingOverlay';
import { useEffect } from 'react';
import { isSharedLink } from './utils/shareLink';

function App() {
  const location = useLocation();

  // Check if the current URL is a shared link
  useEffect(() => {
    // If the URL is already a shared link format, no need to redirect
    if (isSharedLink(location.pathname)) {
      return;
    }

    // Otherwise, the detection and redirection will be handled by the router
  }, [location.pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ContextProvider>
      <Outlet />

      <LoadingOverlay />

      <ToastContainer
        position={'bottom-center'}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <ReactQueryDevtools initialIsOpen={false} />
    </ContextProvider>
  );
}

export default App;
