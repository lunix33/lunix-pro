import { Interpolation, Theme } from "@emotion/react";

export type Mergeable<T> = { [key in keyof T]?: Mergeable<T[key]> };
export type StyleObject<T> = { [_key in keyof T]: Interpolation<Theme> };
