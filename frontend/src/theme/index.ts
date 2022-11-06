export { light } from "./light";
export { dark } from "./dark";

export type { StyleObject } from "./types";

import { StyleObject } from "./types";
export function style<T>(style: StyleObject<T>): StyleObject<T> {
  return style;
}
export const validThemes = ["light", "dark"];
