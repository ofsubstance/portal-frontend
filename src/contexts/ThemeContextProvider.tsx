import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useEffect, useState } from "react";

declare module "@mui/material/styles" {
  interface Palette {
    ghost: Palette["primary"];
  }

  interface PaletteOptions {
    ghost?: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ghost: true;
  }
}

const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed5e5e",
    },
    text: {
      primary: "#606f85",
      secondary: "#8492A5",
    },
    ghost: {
      main: "#6d6d6d",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 4,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "divider",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)",
        },
        list: {
          padding: "6px 0",
        },
        root: {
          "& .MuiMenuItem-root": {
            margin: "0 6px",
            borderRadius: 4,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgba(95, 116, 141, 0.03) 0px 2px 1px -1px, rgba(95, 116, 141, 0.04) 0px 1px 1px 0px, rgba(95, 116, 141, 0.08) 0px 1px 3px 0px;",
        },
      },
    },
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
