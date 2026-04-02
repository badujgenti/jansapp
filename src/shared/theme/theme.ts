import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors, Colors } from "./colors";
import { typography } from "./typography";
import { spacing, borderRadius } from "./spacing";

export interface Theme {
  mode: "light" | "dark";
  colors: Colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
}

export function createTheme(mode: "light" | "dark"): Theme {
  return {
    mode,
    colors: mode === "light" ? lightColors : darkColors,
    typography,
    spacing,
    borderRadius,
  };
}

const ThemeContext = createContext<Theme>(createTheme("light"));

interface ThemeProviderProps {
  mode?: "light" | "dark";
  children: React.ReactNode;
}

export function ThemeProvider({ mode, children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const resolvedMode = mode ?? (systemScheme === "dark" ? "dark" : "light");
  const theme = useMemo(() => createTheme(resolvedMode), [resolvedMode]);

  return React.createElement(ThemeContext.Provider, { value: theme }, children);
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
