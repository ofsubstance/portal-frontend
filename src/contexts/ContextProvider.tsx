import { AuthContextProvider } from "./AuthContextProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";

const googleClientId =
  "254412738059-n7c755k5so031eodq19m6p9867d0i1t3.apps.googleusercontent.com";

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  );
}

export default ContextProvider;
