import "@emotion/react";
declare module "@emotion/react" {
  export interface ThemeColors {
    primary: ThemeColor;
    text: ThemeTextColor;
    textColor(_c: ThemeColor): string;
  }

  export interface ThemeColor {
    code: string;
    requireContrast: boolean;
  }

  export interface ThemeTextColor {
    normal: string;
    contrast: string;
  }

  export interface ThemeTable {
    roundness: string;
    borderThickness: string;
    columnWidth: string;
    headerAlign: string;
  }

  export interface ThemeBreakpoints {
    small: string;
    medium: string;
    large: string;

    print(): string;
    up(_breakpoint: ThemeBreakpointsKeys): string;
    down(_breakpoint: ThemeBreakpointsKeys): string;
  }
  export type ThemeBreakpointsKeys = keyof Omit<
    ThemeBreakpoints,
    "print" | "up"
  >;

  export interface Theme {
    colors: ThemeColors;
    spacing(_unit: number): string;
    table: ThemeTable;
    breakpoints: ThemeBreakpoints;
  }
}
