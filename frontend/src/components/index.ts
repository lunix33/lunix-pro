import { Interpolation, Theme, Mergeable, ThemeColor } from "@emotion/react";

export type StyleObject = { [key: string]: Interpolation<Theme> };

export const validThemes = ["light", "dark"];

function composeTheme<T>(...partials: (Mergeable<T> | null | undefined)[]): T {
  const theme: any = {};
  for (const partial of partials) {
    if (partial == null) continue;

    for (let [key, value] of Object.entries(partial)) {
      if (typeof value === "object") {
        value = composeTheme(theme[key] ?? {}, value);
      }
      theme[key] = value;
    }
  }

  return theme as T;
}

const common: Mergeable<Theme> = {
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
  spacing: (unit: number) => `${unit * 0.5}rem`,
};

export const light: Theme = composeTheme(common, {
  colors: {
    primary: { code: "blue", requireContrast: true },
    text: {
      normal: "hsla(0deg, 0%, 5%, 1)",
      contrast: "hsla(0deg, 0%, 95%, 1)",
    },
  },
});

export const dark: Theme = composeTheme(common, {
  colors: {
    primary: { code: "pink", requireContrast: true },
    text: {
      normal: "hsla(0deg, 0%, 10%, 1)",
      contrast: "hsla(0deg, 0%, 90%, 1)",
    },
  },
});
