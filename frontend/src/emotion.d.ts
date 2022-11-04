import "@emotion/react";
declare module "@emotion/react" {
  type Mergeable<T> = { [key in keyof T]?: Mergeable<T[key]> };

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

  export interface Theme {
    colors: ThemeColors;
    spacing(_unit: number): string;
    table: ThemeTable;
  }
}
