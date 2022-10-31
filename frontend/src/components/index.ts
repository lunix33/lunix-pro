import { Interpolation, Theme } from "@emotion/react";

export type StyleObject = { [key: string]: Interpolation<Theme> };

export const validThemes = ["light", "dark"];

export const light: Theme = {
  colors: {
    primary: "red",
  },
};

export const dark: Theme = {
  colors: {
    primary: "red",
  },
};
