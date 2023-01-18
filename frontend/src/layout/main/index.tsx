import { ReactElement } from "react";

import { MainProps } from "./types";
import classes from "./styles.module.scss";

export default function Main({ children }: MainProps): ReactElement {
  return <main className={classes.main}>{children}</main>;
}

export type { MainProps } from "./types";
