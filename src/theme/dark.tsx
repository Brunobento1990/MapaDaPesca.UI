import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  palette: {
    primary: {
      main: "#9147ff",
    },
    text: {
      primary: "#f6f8fc",
      secondary: "#f1f1f1",
    },
    mode: "dark",
    background: {
      default: "#141414",
      paper: "#242424",
    },
  },
});
