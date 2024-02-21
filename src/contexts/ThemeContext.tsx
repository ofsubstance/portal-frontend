import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {}, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
