import { createContext } from "react";

import type { Mode, Theme } from "@/styles/theme/types";

interface IThemeContext {
  mode: Mode
  theme: Theme
  toggleMode: () => void
  changeTheme: (theme: Theme) => void
  isDarkMode: boolean
}

export const ThemeContext = createContext<IThemeContext>(null!);

