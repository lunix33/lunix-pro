import { Theme, ThemeBreakpointsKeys, ThemeColor } from "@emotion/react";

import { Mergeable } from "./types";

export const common: Mergeable<Theme> = {
  colors: {
    textColor(color: ThemeColor): string {
      return (
        (color.requireContrast ? this.text?.contrast : this.text?.normal) ??
        "black"
      );
    },
  },
  table: {
    borderThickness: "1px",
    roundness: "5px",
    columnWidth: "150px",
    headerAlign: "center",
  },
  spacing: (unit: number) => `${unit * 0.5}em`,
  breakpoints: {
    small: "0px",
    medium: "640px",
    large: "1024px",
    print: () => "@media print",
    up(breakpoint: ThemeBreakpointsKeys) {
      return `@media screen and (min-width: ${this[breakpoint]})`;
    },
    down(breakpoint: ThemeBreakpointsKeys) {
      return `@media screen and (max-width: ${this[breakpoint]})`;
    },
  },
};
