import { useMemo } from "react";

import { StyleObject } from "./types";

export function makeStyles<T, P = any>(
  style: StyleObject<T> | ((_props?: P) => StyleObject<T>)
): (_props?: P) => StyleObject<T> {
  return typeof style !== "function"
    ? function useStyles() {
        return style;
      }
    : function useStyles(props?: P) {
        return useMemo(() => {
          return style(props);
        }, [props]);
      };
}

export { light } from "./light";
export { dark } from "./dark";
export const validThemes = ["light", "dark"];

export type { StyleObject } from "./types";
