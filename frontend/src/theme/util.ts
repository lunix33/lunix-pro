import { Mergeable } from "./types";

export function composeTheme<T>(
  ...partials: (Mergeable<T> | null | undefined)[]
): T {
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
