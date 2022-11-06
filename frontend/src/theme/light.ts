import { Theme } from "@emotion/react";

import { common } from "./common";
import { composeTheme } from "./util";

export const light: Theme = composeTheme(common, {
  colors: {
    primary: { code: "blue", requireContrast: true },
    text: {
      normal: "hsla(0deg, 0%, 5%, 1)",
      contrast: "hsla(0deg, 0%, 95%, 1)",
    },
  },
});
