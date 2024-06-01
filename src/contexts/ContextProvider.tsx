import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";
import ModalProvider from "@ebay/nice-modal-react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./AuthContextProvider";

const googleClientId =
  "254412738059-n7c755k5so031eodq19m6p9867d0i1t3.apps.googleusercontent.com";

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ModalProvider.Provider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </ModalProvider.Provider>
        </LocalizationProvider>
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  );
}

export default ContextProvider;
