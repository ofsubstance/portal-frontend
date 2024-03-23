import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthContextProvider } from "./AuthContextProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";

const googleClientId =
  "254412738059-n7c755k5so031eodq19m6p9867d0i1t3.apps.googleusercontent.com";

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </LocalizationProvider>
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  );
}

export default ContextProvider;
