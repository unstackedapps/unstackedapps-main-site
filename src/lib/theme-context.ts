import { createContext } from "react";

type Theme = "dark" | "light" | "system";

export interface ThemeProviderState {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

const initialState: ThemeProviderState = {
  setTheme: () => null,
  theme: "system",
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
