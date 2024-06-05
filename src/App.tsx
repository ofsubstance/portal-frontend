import { Outlet } from "react-router-dom";

import ContextProvider from "@/contexts/ContextProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import LoadingOverlay from "./components/common/loader/LoadingOverlay";

function App() {
  return (
    <ContextProvider>
      <Outlet />

      <LoadingOverlay />

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
    </ContextProvider>
  );
}

export default App;
