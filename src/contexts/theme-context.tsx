import { useLocalStorage } from "@/hooks/use-local-storage-app";
import { DarkTheme } from "@/theme/dark";
import { LigthTheme } from "@/theme/ligth";
import { ThemeProvider } from "@mui/material";
import { ReactNode, createContext, useEffect, useState } from "react";

interface IAppThemeContext {
  mode: Theme;
  handleMode: () => void;
}

interface IAppThemeProvider {
  children: ReactNode;
}

export type Theme = "dark" | "light";

export const AppThemeContext = createContext({
  mode: "dark",
  handleMode: () => console.log(),
} as IAppThemeContext);

export function AppThemeProvider(props: IAppThemeProvider) {
  const { getItem, setItem } = useLocalStorage();
  const [mode, setMode] = useState<Theme>("light");
  function handleMode() {
    const novoMode = mode === "dark" ? "light" : "dark";
    setMode(novoMode);
    setItem("theme", novoMode);
  }

  function init() {
    const temaLocalStorage = getItem<Theme>("theme");
    if (temaLocalStorage) {
      setMode(temaLocalStorage);
      return;
    }

    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        if (mode === "dark") {
          return;
        }
        setMode("dark");
      } else {
        if (mode === "light") {
          return;
        }
        setMode("light");
      }
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = mode === "dark" ? DarkTheme : LigthTheme;
  return (
    <AppThemeContext.Provider
      value={{
        mode,
        handleMode,
      }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
}
