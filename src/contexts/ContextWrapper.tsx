import { ThemeContextProvider } from "@/contexts/ThemeContext";

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

export default ContextWrapper;
