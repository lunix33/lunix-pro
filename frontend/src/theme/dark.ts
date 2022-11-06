import { Theme } from "@emotion/react";

import { common } from "./common";
import { composeTheme } from "./util";

export const dark: Theme = composeTheme(common, {
  colors: {
    primary: { code: "pink", requireContrast: true },
    text: {
      normal: "hsla(0deg, 0%, 10%, 1)",
      contrast: "hsla(0deg, 0%, 90%, 1)",
    },
  },
});
