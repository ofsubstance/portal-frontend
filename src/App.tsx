import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import ContextWrapper from "./contexts/ContextWrapper";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextWrapper>
        <Outlet />
      </ContextWrapper>

      <ToastContainer
        position={"bottom-center"}
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
    </QueryClientProvider>
  );
}

export default App;
