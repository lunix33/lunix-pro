import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import type { ReactElement } from "react";
import type { ThemeProviderProps } from "./types";

/**
 *
 * @param param0
 */
export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
}
